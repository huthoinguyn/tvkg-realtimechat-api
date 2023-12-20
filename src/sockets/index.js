import { Server } from 'socket.io'
import axios from 'axios'
import { stringify } from 'flatted'
import { API_ROOT } from '~/utils/constants'

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.110.187:3000']
    }
  })

  let activeUsers = []
  io.use((socket, next) => {
    const email = socket.handshake.auth.email
    if (!email) {
      return next(new Error('invalid email'))
    }
    socket.user_id = socket.handshake.auth.id
    socket.email = email
    socket.name = socket.handshake.auth.name
    socket.image = socket.handshake.auth.image
    next()
  })

  io.on('connection', async (socket, next) => {
    console.log('a user connected', socket.handshake.auth)

    const room = `room-${socket.user_id}`
    socket.join(room)

    let chats = []
    let users = []

    socket.on('myChats', async (id) => {
      activeUsers = []
      for (let [id, socket] of io.of('room').sockets) {
        const existUser = activeUsers.find((u) => u.user_id === socket.user_id)
        if (!existUser) {
          activeUsers.push({
            id,
            user_id: socket.user_id,
            email: socket.email,
            name: socket.name,
            image: socket.image
          })
        }
      }
      const { data } = await axios.get(`http://localhost:8017/v1/chats/user/${id}`)
      chats = data.data //Lấy ra danh sách các đoạn chat thuộc về người dùng

      users = await Promise.all(
        chats.map(async (c) => {
          const { data } = await axios.get(`http://127.0.0.1:8000/api/v1/users/${c.participantIds}`)
          const messages = await axios.get(`http://localhost:8017/v1/messages/${c._id}`)
          return {
            ...c,
            user: data.result,
            // connected: false,
            // id: null,
            messages: messages.data
          }
        })
      ) // Lấy ra thông tin chi tiết của đoạn chat

      // Cập nhật trạng thái đang hoạt động của người dùng
      const userList = await Promise.all(
        users.map((u) => {
          const us = activeUsers.find((uss) => uss?.user_id === u?.user?.id)
          return {
            ...u,
            connected: !!us,
            id: us?.id
          }
        })
      )

      socket.emit('getUsers', JSON.stringify(userList))
    })

    socket.broadcast.emit('userConnected', {
      id: socket.id,
      user_id: socket.user_id,
      email: socket.email,
      name: socket.name,
      image: socket.image
    })

    socket.on('sendMessage', ({ message, from, to }) => {
      console.log('===SEND===', {
        from,
        to,
        message
      })
      // Gửi sự kiện "newMessage" tới tất cả các người dùng khác
      const room = `room-${to}`
      socket.to(room).emit('recieveMessage', { message, from, to })
      console.log('===SENDED===', {
        from,
        to,
        message
      })
    })

    socket.on('disconnect', () => {
      // Gửi sự kiện "userDisconnected" tới tất cả các người dùng khác
      socket.broadcast.emit('userDisconnected', {
        id: socket.id,
        user_id: socket.user_id,
        email: socket.email,
        image: socket.image,
        name: socket.name
      })
      activeUsers.splice(
        activeUsers.findIndex((u) => u.id === socket.id),
        1
      )
      console.log('user disconnected', socket.email)
    })
  })
}

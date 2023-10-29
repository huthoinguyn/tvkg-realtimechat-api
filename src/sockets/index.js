import { Server } from 'socket.io'
import axios from 'axios'
import { API_ROOT } from '~/utils/constants'

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:3000', 'http://192.168.110.187:3000']
    }
  })

  io.use((socket, next) => {
    const email = socket.handshake.auth.email
    if (!email) {
      return next(new Error('invalid email'))
    }
    socket.user_id = socket.handshake.auth.user_id
    socket.email = email
    socket.username = socket.handshake.auth.username
    socket.avatar = socket.handshake.auth.avatar
    next()
  })

  io.on('connection', async (socket, next) => {
    console.log('a user connected', socket.handshake.auth)

    const getUsers = await axios.get(`${API_ROOT}/v1/chats`)
    console.log(getUsers.data.data)

    // Lấy danh sách người dùng đã đăng nhập
    const users = []
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        id,
        user_id: socket.user_id,
        email: socket.email,
        username: socket.username,
        avatar: socket.avatar
      })
    }

    // Phát sự kiện "getUsers" cho tất cả các socket đang kết nối
    socket.emit('getUsers', users)

    socket.broadcast.emit('userConnected', {
      id: socket.id,
      user_id: socket.user_id,
      email: socket.email,
      username: socket.username,
      avatar: socket.avatar
    })

    socket.on('sendMessage', ({ message, from, to }) => {
      // Emit the received message to the recipient
      socket.to(to).emit('recieveMessage', {
        message,
        from: from
      })
    })

    socket.on('disconnect', () => {
      // Gửi sự kiện "userDisconnected" tới tất cả các người dùng khác
      socket.broadcast.emit('userDisconnected', {
        id: socket.id,
        user_id: socket.user_id,
        email: socket.email,
        avatar: socket.avatar,
        username: socket.username
      })
      console.log('user disconnected')
    })

    socket.on('message', (msg) => {
      console.log('message: ' + msg)
      io.emit('message', msg)
    })
  })
}

import express from 'express'
import { chatRouter } from './chatRoute'
import { messageRouter } from './messageRoute'

const Router = express.Router()

Router.get('/status', async (req, res) => {
  res.status(200).json({ status: 'OK' })
})

Router.use('/chats', chatRouter)
Router.use('/messages', messageRouter)

export const APIs_V1 = Router

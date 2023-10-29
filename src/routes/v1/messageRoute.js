import express from 'express'
import { messageController } from '~/controllers/messageController'
import { messageValidation } from '~/validations/messageValidation'

const Router = express.Router()

Router.route('/')
  .get(messageController.getAll)
  .post(messageValidation.createdNewMessage, messageController.createNewMessage)

Router.route('/:id')
  .delete(messageController.deleteMessage)
Router.route('/:chat_id')
  .get(messageController.getAllMessageInChat)

export const messageRouter = Router

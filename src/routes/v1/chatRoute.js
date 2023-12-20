import express from 'express'
import { chatController } from '~/controllers/chatController'
import { chatValidation } from '~/validations/chatValidation'

const Router = express.Router()

Router.route('/').get(chatController.getAllChat).post(chatValidation.createNew, chatController.createNew)

Router.route('/:id')
  .delete(chatController.deleteChat)
  .get(chatController.findChatById)
  .delete(chatController.deleteChat)

Router.route('/user/:id').get(chatController.getChatByUserId)

export const chatRouter = Router

/* eslint-disable no-useless-catch */
import { messageModel } from '~/models/messageModel'

const createNewMessage = async (data) => {
  try {
    const newMessage = {
      ...data,
      status: 'sent',
      type: 'text',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _destroy: false
    }
    const message = await messageModel.createNewMessage(newMessage)
    return await messageModel.findMessageById(message.insertedId)
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    return await messageModel.getAll()
  } catch (error) {
    throw error
  }
}

const getAllMessageInChat = async (id) => {
  try {
    return await messageModel.getAllMessageInChat(id)
  } catch (error) {
    throw error
  }
}

const deleteMessage = async (id) => {
  try {
    return await messageModel.deleteMessage(id)
  } catch (error) {
    throw error
  }
}

export const messageService = {
  createNewMessage,
  getAll,
  getAllMessageInChat,
  deleteMessage
}

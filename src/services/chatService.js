/* eslint-disable no-useless-catch */

import { chatModel } from '~/models/chatModel'

const createNew = async (data) => {
  try {
    const newChat = {
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      _destroy: false
    }

    const chat = await chatModel.createNew(newChat)
    const result = chatModel.findChatById(chat.insertedId)
    return result
  } catch (error) {
    throw error
  }
}

const getAllChat = async () => {
  try {
    return await chatModel.getAllChat()
  } catch (error) {
    throw error
  }
}

const findChatById = async (id) => {
  try {
    return await chatModel.findChatById(id)
  } catch (error) {
    throw error
  }
}

const deleteChat = async (id) => {
  try {
    return await chatModel.deleteChat(id)
  } catch (error) {
    throw error
  }
}

export const chatService = {
  getAllChat,
  createNew,
  findChatById,
  deleteChat
}

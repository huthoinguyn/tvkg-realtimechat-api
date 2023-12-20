/* eslint-disable no-useless-catch */

import axios from 'axios'
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

const getChatByUserId = async (id) => {
  try {
    const chats = await chatModel.getChatByUserId(id)
    const chatsWithUserDetails = await Promise.all(
      chats.map((chat) => {
        const users = chat.participantIds.filter((participantId) => participantId !== id)

        return { ...chat, participantIds: users[0] }
      })
    )
    return chatsWithUserDetails
  } catch (error) {
    throw error
  }
}

export const chatService = {
  getAllChat,
  createNew,
  findChatById,
  deleteChat,
  getChatByUserId
}

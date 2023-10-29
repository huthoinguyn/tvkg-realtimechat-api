/* eslint-disable no-useless-catch */
import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { chatService } from '~/services/chatService'

const createNew = async (req, res, next) => {
  try {
    const data = await chatService.createNew(req.body)
    res.status(StatusCodes.CREATED).json({ message: 'Created new Chat Successfully', data: { ...data } })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message })
  }
  next()
}

const getAllChat = async (req, res) => {
  try {
    const data = await chatService.getAllChat()
    res.status(StatusCodes.OK).json({ message: 'Get All Chat Successfully', data: [...data] })
  } catch (error) {
    throw error
  }
}

const findChatById = async (req, res) => {
  try {
    const { id } = req.params
    const data = await chatService.findChatById(new ObjectId(id))
    res.status(StatusCodes.OK).json({ message: 'Get Chat Successfully', data: { ...data } })
  } catch (error) {
    throw error
  }
}

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params
    const data = await chatService.deleteChat(new ObjectId(id))
    res.status(StatusCodes.OK).json({ message: 'Delete Chat Successfully', data: { ...data } })
  } catch (error) {
    throw error
  }
}

export const chatController = {
  getAllChat,
  createNew,
  findChatById,
  deleteChat
}

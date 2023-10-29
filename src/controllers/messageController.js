import { StatusCodes } from 'http-status-codes'
import { ObjectId } from 'mongodb'
import { messageService } from '~/services/messageService'
import ApiError from '~/utils/ApiError'

const createNewMessage = async (req, res, next) => {
  try {
    const result = await messageService.createNewMessage(req.body)
    res.status(StatusCodes.CREATED).json(result)
  } catch (error) {
    next(ApiError())
  }
}

const getAll = async (req, res) => {
  const result = await messageService.getAll()
  res.status(StatusCodes.OK).json(result)
}

const getAllMessageInChat = async (req, res) => {
  const { chat_id } = req.params
  const result = await messageService.getAllMessageInChat(chat_id)
  res.status(StatusCodes.OK).json(result)
}

const deleteMessage = async (req, res) => {
  const { id } = req.params
  const result = await messageService.deleteMessage(new ObjectId(id))
  res.status(StatusCodes.OK).json(result)
}

export const messageController = {
  createNewMessage,
  getAll,
  getAllMessageInChat,
  deleteMessage
}

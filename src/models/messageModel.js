import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const COLLECTION_NAME = 'messages'
const COLLECTION_SCHEMA = Joi.object({
  chat_id: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  sender_id: Joi.number().integer().required(),
  message: Joi.string().required(),
  type: Joi.string().required(),
  status: Joi.string().required(),
  createdAt: Joi.date().timestamp('javascript').required().default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').required().default(Date.now),
  _destroy: Joi.boolean().required().default(false)
})

const getAll = async () => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const getAllMessageInChat = async (id) => {
  console.log(id)
  try {
    return await GET_DB().collection(COLLECTION_NAME).find({ chat_id: id, _destroy: false }).toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const createNewMessage = async (data) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findMessageById = async (id) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).findOne({ _id: id })
  } catch (error) {
    throw new Error(error)
  }
}

const deleteMessage = async (id) => {
  try {
    return await GET_DB()
      .collection(COLLECTION_NAME)
      .updateOne({ _id: id }, { $set: { _destroy: true } })
  } catch (error) {
    throw new Error(error)
  }
}

export const messageModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllMessageInChat,
  createNewMessage,
  findMessageById,
  getAll,
  deleteMessage
}

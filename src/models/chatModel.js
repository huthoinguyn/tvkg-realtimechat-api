/* eslint-disable no-useless-catch */
import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const COLLECTION_NAME = 'chats'
const COLLECTION_SCHEMA = Joi.object({
  participantIds: Joi.array(),
  createdAt: Joi.date().timestamp('javascript').required().default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').required().default(Date.now),
  _destroy: Joi.boolean().required().default(false)
})

const createNew = async (data) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

const findChatById = async (id) => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).findOne({ _id: id, _destroy: false })
  } catch (error) {
    throw new Error(error)
  }
}

const getAllChat = async () => {
  try {
    return await GET_DB().collection(COLLECTION_NAME).find({ _destroy: false }).toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const deleteChat = async (id) => {
  try {
    return await GET_DB()
      .collection(COLLECTION_NAME)
      .findOneAndUpdate({ _id: id, _destroy: false }, { $set: { _destroy: true } })
  } catch (error) {
    throw new Error(error)
  }
}

const getChatByUserId = async (id) => {
  console.log(
    await GET_DB()
      .collection(COLLECTION_NAME)
      .find({ participantIds: { $in: [id] }, _destroy: false })
      .toArray()
  )
  try {
    return await GET_DB()
      .collection(COLLECTION_NAME)
      .find({ participantIds: { $in: [id] }, _destroy: false })
      .toArray()
  } catch (error) {
    throw new Error(error)
  }
}

export const chatModel = {
  COLLECTION_NAME,
  COLLECTION_SCHEMA,
  getAllChat,
  createNew,
  findChatById,
  deleteChat,
  getChatByUserId
}

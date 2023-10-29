import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const schema = Joi.object({
    participantIds: Joi.array()
  })

  try {
    await schema.validateAsync(req.body, { abortEarly: false })

    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }

  // return res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED, message: 'Create new chat successfully' })
  //   res.status(StatusCodes.CREATED).json({ status: StatusCodes.CREATED, message: 'Create new chat successfully' })
}

export const chatValidation = { createNew }

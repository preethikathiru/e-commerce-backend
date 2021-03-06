const Logger = require("../utils/log")
const userModel = require("../models/user")

const logger = new Logger('User-repositories')

async function sendResponse(status, data){
  return {
    status: status,
    data: data
  }
}

class UserRepository {
  async createUser(inputData) {
    try {
      const resp = await userModel.create(inputData)
      return sendResponse(true, resp)
    } catch (error) {
      logger.error('Error in creating new user', error)
      return sendResponse(false, error.message)
    }
  }

  async getUserByEmail(email) {
    try {
      const resp = await userModel.findOne({email: email})
      if(!resp) {
        logger.error(`User ${email} not found`)
        return sendResponse(false, `User ${email} not found`)
      }
      return sendResponse(true, resp)
    } catch (error) {
      logger.error('Error in getting user', error)
      return sendResponse(false, error.message)
    }
  }

  async updateUser(query, update, options){
    try {
      const resp = await userModel.findOneAndUpdate(query, update, options)
      return sendResponse(true, resp)
    } catch (error) {
      logger.error('Error in updating user', error)
      return sendResponse(false, error.message)
    }
  }
  
  async loginUser(inputData) {

  }

  async forgotPassword(inputData) {

  }
}

module.exports = new UserRepository()
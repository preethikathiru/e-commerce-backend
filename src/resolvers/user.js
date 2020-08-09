const otpGenerator = require('otp-generator')
const Logger = require("../utils/log")
const UserRepository = require("../repositories/user")
const userModel = require("../models/user")

const logger = new Logger('User-resolvers')
async function sendResponse(status, data){
  return {
    status: status,
    data: data
  }
}

class UserResolver {
  async createUser(inputData) {
    const oldUser = await UserRepository.getUserByEmail(inputData.email)
    if(oldUser.status){
      return sendResponse(400, `User ${inputData.email} already registered`)
    }

    let newUser = new userModel()
    newUser.email = inputData.email
    newUser.phone = inputData.phone
    newUser.password = inputData.password
    newUser.firstName = inputData.email.split("@")[0]
    newUser.code = otpGenerator.generate(4, {digits: true, alphabets: false, upperCase: false, specialChars: false })

    const createdUser = await UserRepository.createUser(newUser)
    if(createdUser.status === false){
      return sendResponse(400, createdUser.data)
    }
    logger.info("New user created", createdUser.data)
    return sendResponse(200, createdUser.data)
    
    /**
     * To return only email after signup
     */
    // return sendResponse(200, {
    //   email: createdUser.data.email,
    // })
  }

  async verifyUserEmail(inputData) {
    const oldUser = await UserRepository.getUserByEmail(inputData.email)
    if(!oldUser.status){
      return sendResponse(400, `User ${inputData.email} not found`)
    }

    if(oldUser.data.code !== inputData.code || inputData.code === ''){
      logger.error(`Invalid OTP for ${inputData.email}. Expected: ${oldUser.data.code} but Received: ${inputData.code}`)
      return sendResponse(400, `Invalid OTP for ${inputData.email}`)
    }
    const query = {email: inputData.email},
    update = { 
      $set: {
        code: '',
        emailVerified: true,
        modifiedAt: new Date()
      }
    },
    options = { upsert: true, new : true };
    const updatedUser = await UserRepository.updateUser(query, update, options)
    if(!updatedUser.status){
      return sendResponse(400, updatedUser.data)
    }
    logger.info(`User ${inputData.email} is verified`, updatedUser.data)
    return sendResponse(200, updatedUser.data)
  }

  async updateUserDetails(inputData) {

  }

  async updatePassword(inputData) {

  }

  async loginUser(inputData) {
    
  }

  async forgotPassword(inputData) {

  }
}

module.exports = new UserResolver()
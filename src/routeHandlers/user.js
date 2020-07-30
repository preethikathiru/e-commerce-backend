const Logger = require("../utils/log")
const UserResolver = require("../resolvers/user")

const logger = new Logger('User-routeHandlers')
async function sendResponse(res, status, data){
  return res.status(status).send({
    status: status,
    data: data
  })
}

class UserRouteHandler {
  async createUser(req, res, next) {
    const inputData = req.body
    const errors = new Array();
    if(!inputData.email) {
      errors.push("email field not found")
    }
    if(!inputData.phone) {
      errors.push("phone field not found")
    }
    if(!inputData.password) {
      errors.push("password field not found")
    }

    if(errors.length > 0){
      logger.error("Fields not found", errors)
      return sendResponse(res, 500, errors)
    }

    const resp = await UserResolver.createUser(inputData)
    return sendResponse(res, resp.status, resp.data)
  }

  async verifyUserEmail(req, res, next) {
    const inputData = req.body
    const errors = new Array();
    if(!inputData.email) {
      errors.push("email field not found")
    }
    if(!inputData.code) {
      errors.push("code field not found")
    }

    if(errors.length > 0){
      logger.error("Fields not found", errors)
      return sendResponse(res, 500, errors)
    }
    const resp = await UserResolver.verifyUserEmail(inputData)
    return sendResponse(res, resp.status, resp.data)
  }

  async updateUserDetails(req, res, next) {

  }

  async updatePassword(req, res, next) {
    
  }

  async loginUser(req, res, next) {
    
  }

  async forgotPassword(req, res, next) {
    
  }
}

module.exports = new UserRouteHandler()
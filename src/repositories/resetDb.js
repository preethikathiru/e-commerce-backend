const Logger = require("../utils/log")
const userModel = require("../models/user")

const logger = new Logger('resetDb-repositories')

class ResetDbRepository {
  async reset(){
    try {
      await userModel.deleteMany({}) 
    } catch (error) {
      logger.error("Failed to reset DB", error)
      throw new Error(error);
    }
  }
}

module.exports = new ResetDbRepository()
const mongoose = require("mongoose")
const Logger = require('./log')

const logger = new Logger('initdb')

class InitDb{

  /**
  * Connecting to the mongodb database" 
  */
  async dbConnection() {
    try {
      await mongoose.connect('mongodb://root:rootpassword@127.0.0.1:27017/ecommerce?authSource=admin', {
        keepAlive: true, 
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      mongoose.set("debug", false)
      mongoose.Promise = Promise
      logger.info("Connected to MongoDB successfully")
      return;
    } catch (error) {
      logger.error("Database connection error", error)
      throw new Error(`Database connection error - ${JSON.stringify(error)}`)
    }
  }
}

module.exports = new InitDb()
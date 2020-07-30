const Logger = require("../utils/log")
const ResetDbRepository = require("../repositories/resetDb")

const logger = new Logger('ResetDb-resolvers')

class ResetDbResolver {
  async resetDb(){
    await ResetDbRepository.reset()
    logger.info("DB reset completed")
    return
  }
}

module.exports = new ResetDbResolver()
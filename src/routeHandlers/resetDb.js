const Logger = require("../utils/log")
const ResetDbResolver = require("../resolvers/resetDb")

const logger = new Logger('ResetDb-routeHandlers')

class ResetDbRouteHandler {
  async resetDb(req, res, next){
    await ResetDbResolver.resetDb()
    return res.status(200).send("DB reset completed")
  }
}

module.exports = new ResetDbRouteHandler()
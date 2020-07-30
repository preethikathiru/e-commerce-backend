const Logger = require("../utils/log")
const logger = new Logger('Authorization')

class Authorization {
  async authorize(req, res, next) {
    if (req.headers.authorization) {
      const toks = req.headers.authorization.split(' ')
      if (toks[0] === 'Bearer') {
        // set the context of the current user who is making this call
        req.userId = toks[1]
        logger.info(`User ID - ${toks[1]}`)
      } else {
        // handle other service requests
      }
    }else {
      // APIs without auth
    }
    next()
  }
}

module.exports = new Authorization()
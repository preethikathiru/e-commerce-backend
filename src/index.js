const express = require("express")
const bodyParser = require("body-parser")
// const cors = require("cors")
const InitDb = require("./utils/initdb")
const Logger = require("./utils/log")
const Authorization = require("./middlewares/authorization")
const UserRouteHandler = require("./routeHandlers/user")
const ResetDbRouteHandler = require("./routeHandlers/resetDb")

const logger = new Logger('index')
const PORT = process.env.PORT || 3000
const app = express()
app.use(Authorization.authorize)
// app.use(cors())
app.use(bodyParser.json())

/**
 * APIs for testing only
 */
app.get("/reset-db", ResetDbRouteHandler.resetDb)

/**
 * Main APIs without AUTH
 */
app.post("/signup", UserRouteHandler.createUser)
app.post("/verify-email", UserRouteHandler.verifyUserEmail)
app.post("/login", UserRouteHandler.loginUser)
app.post("/forgot-password", UserRouteHandler.forgotPassword)

/**
 * Main APIs with AUTH
 */
app.post("/update-user-info", UserRouteHandler.updateUserDetails)
app.post("/update-password", UserRouteHandler.updatePassword)
// app.post("/login-with-token")

/**
 * Starting the server
 */
InitDb.dbConnection().then(() => {
  app.listen(PORT, () => {
    logger.info(`listening on port ${PORT}`)
  })
})
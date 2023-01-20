const express = require('express')
const { authRoutes } = require("./userRoutes/index")

const router = express.Router()

authRoutes(router)


module.exports = router
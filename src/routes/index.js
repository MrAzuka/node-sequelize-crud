const express = require('express')
const { authRoutes } = require("./userRoutes")
const { todoRoutes } = require("./todoRoutes")

const router = express.Router()

authRoutes(router)
todoRoutes(router)


module.exports = router
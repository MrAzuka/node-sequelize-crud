const User = require('../models/userModel')
const bcrypt = require('bcrypt')
require('dotenv').config()
const { admin_password } = process.env

exports.createAdmin = async () => {
    try {
        // // Check if Admin already exists
        const findAdmin = await User.findOne({ role: "admin" })
        if (findAdmin) return console.log("Admin already exists")

        // Create new Admin
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(admin_password, salt)
        const createAdmin = await new User({

            username: "admin",
            email: "admin@admin.com",
            password: hashPassword,
            role: "admin"
        })
        const newAdmin = await createAdmin.save()
        console.log("Admin Created")
    } catch (err) {
        console.log(err)
    }

}
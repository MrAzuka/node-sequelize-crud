const User = require("../../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const checkIfUserExist = await User.findOne({ where: { email } })

        if (checkIfUserExist) {
            return res.status(409).json({ message: "email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({ username: username, email: email, password: hashedPassword });
        const savedUser = await newUser.save()
        if (!savedUser) {
            return res.status(400).json({ error: "Cannot register user at the moment!" });
        } else {
            return res.status(200).json({ message: "registration successful" });
        }

    } catch (error) {
        return res.status(500).json({ message: "server error", error: error });
    }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists in DB
        const checkIfUserExist = await User.findOne({ where: { email } })
        if (!checkIfUserExist) {
            return res.status(400).json({ message: "user doesn't exist" });
        }
        // Validate users password with bcrypt
        const validateUsersPassword = await bcrypt.compare(password, checkIfUserExist.password)
        if (!validateUsersPassword) {
            return res.status(400).json({ message: "password mismatch" });
        }

        // NOTE: the jwt secret should be saved in an env file
        const jwtToken = jwt.sign({ username: checkIfUserExist.username, role: checkIfUserExist.role }, "JWT_SECRET");

        return res.status(200).json({ message: "login successful", token: jwtToken });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "server error", error });
    }
}
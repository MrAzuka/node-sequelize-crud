const User = require("../../models/userModel");

exports.getOneUser = async (req, res) => {
    try {
        const { username } = req.query
        const getUser = await User.findOne({
            where: { username: username }, attributes: {
                exclude: ['password']
            }
        })
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: getUser });
    } catch (error) {
        return res.status(400).json({ message: "error finding User" });
    }
}

exports.getAllUser = async (req, res) => {
    try {

        const getUsers = await User.findAll({
            attributes: {
                exclude: ['password']
            }
        })

        if (getUsers.length === 0) {
            return res.status(200).json({ message: "no User found" });
        }
        return res.status(200).json({ message: getUsers });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "error finding User" });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { username } = req.query
        const data = req.body
        const getUser = await User.findOne({ where: { username: username } })
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const updateUser = await User.update({ username: data.username, email: data.email }, { where: { username: username } })
        const getUpdatedUser = await User.findOne({
            where: { username: username }, attributes: {
                exclude: ['password']
            }
        })
        return res.status(200).json({ message: getUpdatedUser });
    } catch (error) {

        return res.status(400).json({ message: "error updating User" });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { username } = req.query
        const getUser = await User.findOne({ where: { username: username } })
        if (!getUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const deleteUser = await User.destroy({ where: { username: username } })
        return res.status(200).json({ message: "delete success" });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "error deleting User" });
    }
}
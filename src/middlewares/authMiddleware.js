const jwt = require('jsonwebtoken')


exports.authUser = async (req, res, next) => {
    try {
        // Check for an authorization token
        if (!req.headers.authorization) {
            return res.status(401).json({ message: "Authorization Header required" })
        }
        // Split the header and authenticate the token
        let splitHeader = req.headers.authorization.split(' ')
        // Check if bearer is included in the format
        if (splitHeader[0] !== "Bearer") {
            return res.status(401).json({ message: "Expected format 'Bearer <token>'" })
        }
        // Authenticate the token with jwt
        let token = splitHeader[1]

        // NOTE: Again jwt secret should be in an env file
        const verifyJWT = await jwt.verify(token, "JWT_SECRET")
        if (!verifyJWT) {
            res.status(401).json({ message: "Authorization error, Please Login" })
        } else {
            req.user = verifyJWT
            next()
        }

    } catch (error) {
        return res.status(500).json({ error })
    }
}

exports.checkIfAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        res.status(401).json({ message: "Route restricted to admin only" })
    }
    next()

}

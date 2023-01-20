const jwt = require('jsonwebtoken')


exports.authenticateUser = async (req, res, next) => {
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
        const verifyJWT = await jwt.verify(token, JWT_SECRET)
        if (verifyJWT) {

        } else {

        }

        // Move to the next function
        next()
    } catch (error) {

    }
}


(err, decodedToken) => {
    if (err) {
        res.status(500).json({ err })
    }
    if (!decodedToken) {
        res.status(401).json({ message: "Authorization error, Please Login" })
    }
    // made the decoded token global
    req.user = decodedToken
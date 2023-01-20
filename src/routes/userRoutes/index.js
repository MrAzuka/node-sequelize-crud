const { register, login } = require("../../controllers/userControllers/authentication")


exports.authRoutes = (router) => {
    router.post("/register", register);
    router.post("/login", login);
}

const { register, login } = require("../controllers/userControllers/authentication")
const { getOneUser, getAllUser, updateUser, deleteUser } = require("../controllers/userControllers/admin")
const { authUser, checkIfAdmin } = require("../middlewares/authMiddleware")


exports.authRoutes = (router) => {
    // Normal user
    router.post("/register", register);
    router.post("/login", login);

    // Admin User
    router.get("/users/single", authUser, getOneUser);
    router.get("/users/all", authUser, getAllUser);
    router.put("/users/update", authUser, updateUser);
    router.delete("/users/remove", authUser, deleteUser);
}


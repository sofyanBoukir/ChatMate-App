const express = require("express");
const {addUser,checkUserLogin, searchUsers, updateUserData} = require("../controllers/userController")

const router = express.Router()

router.post("/addUser",addUser);
router.post("/checkUserLogin",checkUserLogin);
router.get("/searchUsers",searchUsers);
router.put("/updateUserData",updateUserData)

module.exports = router;
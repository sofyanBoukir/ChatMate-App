const express = require("express");
const {addUser,checkUserLogin, searchUsers, updateUserData} = require("../controllers/userController")
const upload = require("../middlewares/multer");
const { getMessages, sendNewMessage } = require("../controllers/messageController");
const checkUserExists = require("../middlewares/userExists");

const router = express.Router()

// user Routes
router.post("/addUser",addUser);
router.post("/checkUserLogin",checkUserLogin);
router.get("/searchUsers",searchUsers);
router.put("/updateUserData",upload.single("profilePicture"),updateUserData)


// messages routes
router.get("/getMessages",checkUserExists,getMessages);
router.post("/sendNewMessage",checkUserExists,sendNewMessage);

module.exports = router;
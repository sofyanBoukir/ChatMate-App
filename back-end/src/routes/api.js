const express = require("express");
const {addUser,checkUserLogin, searchUsers, updateUserData} = require("../controllers/userController")
const upload = require("../middlewares/multer")

const router = express.Router()

router.post("/addUser",addUser);
router.post("/checkUserLogin",checkUserLogin);
router.get("/searchUsers",searchUsers);
router.put("/updateUserData",upload.single("profilePicture"),updateUserData)

module.exports = router;
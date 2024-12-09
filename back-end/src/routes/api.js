const express = require("express");
const {addUser,checkUserLogin, searchUsers} = require("../controllers/userController")

const router = express.Router()

router.post("/addUser",addUser);
router.post("/checkUserLogin",checkUserLogin);
router.get("/searchUsers",searchUsers);

module.exports = router;
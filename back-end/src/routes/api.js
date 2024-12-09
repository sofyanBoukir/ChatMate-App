const express = require("express");
const {addUser,getUsers,checkUserLogin} = require("../controllers/userController")

const router = express.Router()

router.post("/addUser",addUser);
router.post("/checkUserLogin",checkUserLogin);

module.exports = router;
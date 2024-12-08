const express = require("express");
const {addUser,getUsers} = require("../controllers/userController")

const router = express.Router()

router.get("/getUsers",getUsers);
router.post("/addUser",addUser);

module.exports = router;
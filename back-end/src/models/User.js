const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    fullName : {type : String , required: true},
    username : {type : String, required: true},
    profilePicture : {type: String, required: false},
    status : {type: String, required: false}
},{timestamps:true})

module.exports = mongoose.model("User",userShema)
const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    fullName : {type : String, required: true},
    username : {type : String, required: true, unique: true},
    password : {type : String, required: true}, 
    profilePicture : {type: String, required: false, default: null},
    status : {type: String, enum:['online','offline'], default:"offline"}
},{timestamps:true})

module.exports = mongoose.model("User",userShema)
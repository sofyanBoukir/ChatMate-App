const mongoose = require("mongoose");

const userShema = new mongoose.Schema({
    fullName : {type : String, required: true},
    username : {type : String, required: true, unique: true},
    password : {type : String, required: true}, 
    profilePicture: {
        data: Buffer,
        contentType: String,
      },
    status : {type: String, enum:['online','offline'], default:"offline"},
    lastSeen : {type: Date, default: Date.now}, 
},{timestamps:true})

module.exports = mongoose.model("User",userShema)
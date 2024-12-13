
const mongoose = require("mongoose")


const conversationShema = new mongoose.Schema({
    user_1 : {type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},
    user_2 : {type: mongoose.Schema.Types.ObjectId, ref:"User",required:true},
},{timestamps:true})

module.exports = mongoose.model("Conversation",conversationShema)
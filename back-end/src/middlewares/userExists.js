const mongoose = require("mongoose");
const User = require("../models/User");

const checkUserExists = async (request,response,next) =>{
    const userLoggedInId = request.query.senderId;
    const userToChatId = request.query.receiverId;

    if(!userLoggedInId || !userToChatId) return response.status(401).json({"message":"No ids provided on the request!"});
    if(!mongoose.Types.ObjectId.isValid(userLoggedInId) || !mongoose.Types.ObjectId.isValid(userLoggedInId)){
        return response.status(401).json({
            "message" : "Ids provided not valid!"
        })
    }
    try{
        const usersExists = await User.find({
            _id : {$in:[userLoggedInId,userToChatId]}
        });

        if(usersExists.length < 2) return response.status(401).json({"message":"a user not exist"});    
        next();

    }catch(error){
        return response.status(400).json({
            "message" : error
        })
    }
}

module.exports = checkUserExists;
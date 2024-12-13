const Message  = require("../models/Message")

exports.getMessages = async (request,response) =>{

    const userLoggedInId = request.query.senderId;
    const userToChatId = request.query.receiverId;

    const messages = await Message.find({$or:[{sender_id:userLoggedInId,receiver_id:userToChatId},{sender_id:userToChatId,receiver_id:userLoggedInId}]});
    if(messages.length === 0) return response.json({"message":"Start new conversation with this user!"});

    return response.json({
        "messages" : messages,
    })
}

exports.sendNewMessage = async (request,response) =>{
    const {senderId,receiverId,message} = request.query;
    
    const newMessage = new Message({
        sender_id : senderId,
        receiver_id : receiverId,
        message : message,
    })  

    await newMessage.save();
    response.status(200).json({
        "sent":true,
    });
}
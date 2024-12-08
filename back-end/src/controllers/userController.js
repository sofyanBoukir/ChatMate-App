const User = require("../models/User");

exports.addUser = async (request,response) => {
    try {
        const newUser = new User(request.query);
        const savedUser = await newUser.save();

        response.status(200).json({
            "created" : true,
        });
    } catch (error) {
        response.status(401).json({
            "message" : error
        })
    }
}

exports.getUsers = async (request,response) =>{
    try {
        const users = await User.find();
        response.json({
            "users" : users,
        });
    } catch (error) {
        response.status(401).json({
            "message" : error
        })
    }
}
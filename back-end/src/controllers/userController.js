const User = require("../models/User");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");


const hashPassword = async (password) =>{
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt)
}


exports.addUser = async (request,response) => {
    try {

        const users = await User.find();
        const usernameExists = users.find((user) => user.username === request.query.username);
        if(usernameExists){
            response.status(401).json({
                "message" : "Username already exist"
            })
            return
        }
        const hashedPassword = await hashPassword(request.query.password)
        
        const newUser = new User({
            fullName : request.query.fullName,
            username : request.query.username,
            password : hashedPassword,
        });
        await newUser.save();

        response.status(200).json({
            "created" : true,
        });
    } catch (error) {
        response.status(401).json({
            "message" : error
        })
    }
}

exports.checkUserLogin = async (request,response) =>{
    try {
        const {username,password} = request.query;

        const user = await User.findOne({username:username});
        if(!user) return response.status(404).json({"isLoggedIn":false,"message":"User not found!"});
        
        const isValidCredentials = await bcrypt.compare(password,user.password);
        if(!isValidCredentials) return response.status(401).json({"isLoggedIn":false,"message":"Invalid credentials!"});

        const CREDENTIALS = {
            id : user._id,
            username : user.username,
        }

        const token = JWT.sign(CREDENTIALS,process.env.SECRET_KEY);

        response.status(200).json({
            "isLoggedIn" : true,
            "user" : user,  
            "token" : token,
        });
    }   
    catch (error) {
        response.status(403).json({
            "message" : error
        })
    }
}
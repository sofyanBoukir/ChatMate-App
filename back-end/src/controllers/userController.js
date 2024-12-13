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
        const usernameExists = users.find((user) => user.username === request.body.username);
        if(usernameExists){
            response.status(200).json({
                "message" : "Username already exist"
            })
            return
        }
        const hashedPassword = await hashPassword(request.body.password)
        
        const newUser = new User({
            fullName : request.body.fullName,
            username : request.body.username,
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
        const {username,password} = request.body;

        const user = await User.findOne({username:username});
        if(!user) return response.status(200).json({"isLoggedIn":false,"message":"User not found!"});
        
        const isValidCredentials = await bcrypt.compare(password,user.password);
        if(!isValidCredentials) return response.status(200).json({"isLoggedIn":false,"message":"Invalid credentials!"});

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

exports.updateUserData = async (request,response) =>{
    const token = request.header("Authorization");
    if(!token) return response.status(401).json({"message":"No token provided on the request!"})
    
    const {fullName,username,profilePicture} = request.body;
    
    const decodedToken = JWT.verify(token,process.env.SECRET_KEY);
    const userId = decodedToken.id;

    const usernameExists = await User.countDocuments({username:username,_id:{$ne:userId}});
    if(usernameExists > 0) return response.status(200).json({"usernameAlreadyExist":true,"message":"Username Already exist!"});

    const updateUser = await User.findByIdAndUpdate(
        userId,
        {fullName,username,
            profilePicture: request.file ? {
            data: request.file.buffer,
            contentType: request.file.mimetype,
          } : null
        },
        {new:true}
    );
    
    if(!updateUser) return response.status(400).json({'message':'User not found'});
    response.status(200).json({"updated":true,"user":updateUser});
}


exports.searchUsers = async (request,response) =>{
    const token = request.header("Authorization");
    if(!token) return response.status(401).json({"message":"No token provided on the request!"});
    const authUserUsename = JWT.verify(token,process.env.SECRET_KEY).username;

    const users = await User.find({$and:[{username:{$regex:`^${request.query.username}`}},{username:{$ne:authUserUsename}}]},{username:1,fullName:1,status:1,profilePicture:1});

    if(users){
        response.status(200).json({
            "founded":true,
            "users" : users,
        })
        return
    }
    response.json({
        "message" : "User not found!"
    })
    response.json({
        "message" : "No users!"
    })
}
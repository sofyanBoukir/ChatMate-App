const app = require("./app")
const dbConnect = require("../src/config/db")
const socketIo = require("socket.io")
const http = require("http")
const User = require("./models/User")

const server = http.createServer(app) 
const io = socketIo(server,{
    cors:{
        origin : " http://localhost:5173",
        methods : ['GET','POST','PUT','PATCH','DELETE'],
    }
})


io.on("connection",(socket) =>{
    socket.on("userConnected",async (userId) =>{
        console.log("connected")
        socket.userId = userId
        await User.findByIdAndUpdate(
            {_id:userId},
            {status:"online"}
        )
    })

    socket.on("disconnect",async () =>{
        console.log("disconnected")
        if (socket.userId) { 
            try {
                await User.findByIdAndUpdate(
                    { _id: socket.userId },
                    { status: "offline" }
                );
                console.log(`User ${socket.userId} disconnected and is now offline`);
            } catch (error) {
                console.error("Error updating user to offline on disconnect:", error);
            }
        }
    })
})

dbConnect()

const PORT = process.env.PORT || 5000;
server.listen(PORT,() =>{
    console.log(`Server listenning on PORT ${PORT}`);
})
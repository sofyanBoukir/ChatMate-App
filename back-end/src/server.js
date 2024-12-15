const app = require("./app")
const dbConnect = require("../src/config/db")
const http = require("http")
const { handleUserStatus } = require("./socket/userStatus")

const server = http.createServer(app) 

handleUserStatus(server);
dbConnect()

const PORT = process.env.PORT;
server.listen(PORT,() =>{
    console.log(`Server listenning on PORT ${PORT}`);
})
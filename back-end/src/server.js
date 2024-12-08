const app = require("./app")
const dbConnect = require("../src/config/db")

dbConnect()

const PORT = process.env.PORT || 5000;
app.listen(PORT,() =>{
    console.log(`Server listenning on PORT ${PORT}`);
})
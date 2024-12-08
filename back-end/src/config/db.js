const mongoose = require("mongoose");
require('dotenv').config();
const dbConnect = async () =>{
    try {        
        await mongoose.connect(process.env.MONGO_DB_URL);
        
        console.log("Db connection successfull");
    } catch (error) {
        console.log("DB connection failed! ",error.message);
    }
}
module.exports = dbConnect;
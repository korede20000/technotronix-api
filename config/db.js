const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();

const connectDB = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("connected to mongoDB");
    } catch (error) {
        console.log("could not establish a connection", error);
    }
}

module.exports = connectDB
const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async() =>{
    const connect = await mongoose.connect(
        process.env.MONGODB_URI
    );

    // console.log(`MongoDB conneted: ${connect.connection.host}`);
};

module.exports  = connectDB;

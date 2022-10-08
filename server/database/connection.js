const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:admin123@cluster0.skjfprm.mongodb.net/?retryWrites=true&w=majority";


const connectDB = async()=>{
    try{
    //mogodb connection string
        const con = await mongoose.connect(uri,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log(`MongoDB Connected${con.connection.host}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB
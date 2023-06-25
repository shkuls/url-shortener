const mongoose=require('mongoose');

async function connectDB(connectionString){
   await mongoose.connect(connectionString);
  console.log("connected to db");
}

module.exports=connectDB;
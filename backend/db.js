const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/paytm');
  console.log("connected to db");
}

const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    password:String,
    username:String
});

const User=mongoose.model('User',userSchema);

module.exports={
    User
}
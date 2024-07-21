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

const accountSchema=mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  balance:Number
});
const User=mongoose.model('User',userSchema);
const Account=mongoose.model('Account',accountSchema);
module.exports={
    User,Account
}
const mongooose = require('mongoose');
const Schema=mongooose.Schema;
const objectid=Schema.objectid;
const userSchema = new mongooose.Schema({
    // Your code goes here
    name:{type:String,required:true},
    email:{type:String,unique:true},
    password:{type:String,required:true}
})

const User = mongooose.model('user', userSchema);

module.exports = User;
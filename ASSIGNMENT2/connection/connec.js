const mongoose=require('mongoose');
mongoose.set('strictQuery',false)

async function getConnection(){
    await mongoose.connect('mongodb://localhost/gitAssignment2');
}

module.exports=getConnection;
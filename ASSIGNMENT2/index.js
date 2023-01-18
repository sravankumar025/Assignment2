const express=require('express');
const mongoose=require('mongoose');
const User=require('./models/user');
const Post=require('./models/post');
const conn=require('./connection/connec');
const registerRoute=require('./routes/register');
const loginRoute=require('./routes/login');
const postRoute=require('./routes/posts');
const jwt=require("jsonwebtoken");

conn();
const app=express();

app.use('/posts',(req,res,next)=>{
    let token=req.headers.authorization;
    if(token){
        jwt.verify(token,'secret',function(err,decoded){
            if(err){
                return res.status(403).json({message:"token is not valid"});
            }
            req.user=decoded.data
            next();
        });
    }
    else{
        return res.status(403).json({message: 'user is not authenticated'})
    }
})
app.use('/',registerRoute)
app.use('/',loginRoute)
app.use('/',postRoute)


app.listen(3000, () => console.log('Server is running......'));


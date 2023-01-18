const express=require("express");
const User=require("../models/user");
const bodyParser=require("body-parser");

const router=express.Router();
router.use(bodyParser.urlencoded({extended:false}));

router.use(bodyParser.json());

router.post('/register',async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        if(name && email && password){
            await User.create({name,email,password});
            const data=await User.findOne({name:name,email:email,password:password});
                res.status(200).json({
                    status:"success",
                    message:"Registration done successfully",
                    data
                })
        }
        else{
            return res.status(400).json({
                status:"Failed To Register",
                message:"All fields are mandatory"
            });
        }
    }catch(e){
        if(e.code==11000){
            return res.status(500).json({
                message:"Email already exists"
            })
        }
        return res.status(500).send(e);
    }
})

module.exports=router;
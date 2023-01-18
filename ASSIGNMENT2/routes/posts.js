const express=require('express')
const Post=require('../models/post');
const bodyParser = require('body-parser');

const router = express.Router();

// Your routing code goes here
router.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
router.use(bodyParser.json());

router.get('/posts',async (req,res)=>{
    try{
        const post=await Post.find();
        res.status(200).json({
            status:'Post Created',
            post
        })
    }catch(e){
        res.status(500).json({
            status:'Failed',
            message:e.message,
        })
    }
})


router.post('/posts', async (req,res)=>{
    const {title,body,image}=req.body
    try{
        if(title&&body&&image){
            const post = await Post.create({title,body,image,user:req.user});
            res.status(201).json({
                status:'Post Successfully created',
                post
            })
        }
        else{
            return res.status(400).json({meassage:'details are missing'})
        }
    }catch(e){
        res.status(400).json({
            status:'Failed to create',
            message:e.message,
        })
    }
})


router.put('/posts/:id',async(req,res)=>{
    try{
       const {body,title,image}= req.body
       let post=await Post.updateOne({_id: req.params.id},{$set : {body,title,image}})
       return res.status(201).json({status:"success",post})
    }
    catch(err){
        return res.status(400).json({meassage: err.meassage})
    }
})

router.delete('/posts/:id',async(req,res)=>{
    try{
        let post=await Post.deleteOne({_id:req.params.id})
        return res.status(201).json({
            status:"Successfully created",
            post
        })
    }
    catch(err){
        return res.status(400).json({meassage: err.meassage})
    }
})

module.exports= router
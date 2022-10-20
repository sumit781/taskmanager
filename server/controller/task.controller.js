const db = require("../models")
const jwt= require("jsonwebtoken")
const createTask=async (req,resp,next)=>{
    try{
        const {title,description,assignedTo,date} = req.body
        const task=new db.TASKS({
         title,
         date,
         assignedTo,
         description
        })
        const data=await task.save()
        console.log(data)
        resp.status(200).json({message:'task created successfully',task:data})
    }catch(err){
        console.log(err)
        resp.status(400).json({message:'task creation unsuccessfull',status:400})
    }
}

const getAllTask=async (req,resp,next)=>{
    try{
        const {accesstoken}=req.headers
        const {role,id}=jwt.decode(accesstoken,{json:true})
        if(role=='Admin'){
            data=await db.TASKS.find({}).populate('assignedTo',"_id name role")
        }else{
            data=await db.TASKS.find({assignedTo:id}).populate('assignedTo',"_id name role")
        }
        resp.status(200).json({
            message:'Successfull',
            tasks:data
        })
    }catch(err){
        console.log(err.message,err)
        resp.status(400).json({message:'invalid entry',status:400})
    }
}

const updatetaskStatus=async (req,resp,next)=>{
    try{
        console.log(req.body)
        const {id,status}=req.body.data
        const {accesstoken}=req.headers
        const data=jwt.decode(accesstoken,{
                json:true
            })
        let updatedData
        if(data.role=="Admin"){
            updatedData=await db.TASKS.findOneAndUpdate({_id:id},{
            status:status
        },{
            new:true
        })
        }else{
            updatedData=await db.TASKS.findOneAndUpdate({_id:id,assignedTo:data.id},{
                status:status
            },{
                new:true
            })
        }
        if(updatedData){
            resp.status(200).json({message:'update successfull'})
        }else{
            resp.status(400).json({message:'UnAuthorised user'})
        }
    }catch(err){
        console.log(err)
        resp.status(400).json({message:'invalid entry',status:400})
    }
}

const updateTask=async (req,resp,next)=>{
    try{
        const {id,status,title,description}=req.body
        const {accesstoken}=req.headers
        const data=jwt.decode(accesstoken,{
                json:true
            })
        let updatedData
        if(data.role=="Admin"){
            updatedData=await db.TASKS.findOneAndUpdate({_id:id},{
            status,
            title,
            description
        },{
            new:true
        })
        }else{
            updatedData=await db.TASKS.findOneAndUpdate({_id:id,assignedTo:data.id},{
            status,
            title,
            description
            },{
                new:true
            })
        }
        if(updatedData){
            resp.status(200).json({message:'update successfull'})
        }else{
            resp.status(400).json({message:'UnAuthorised user'})
        }
    }catch(err){
        resp.status(400).json({message:'invalid entry',status:400})
    }
}
module.exports = {
    createTask,
    getAllTask,
    updatetaskStatus,
    updateTask
}
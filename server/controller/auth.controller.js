const db=require('../models')
const jwt=require('jsonwebtoken')
const bycrypt=require('bcryptjs')

const login=async (req,resp,next)=>{
    console.log(req.body,'/// request')
    try{
        const {emailId,password}=req.body
        const user = await db.USERS.findOne({emailId})
        if(user){
            if(bycrypt.compareSync(password,user.password)){        
                const token=jwt.sign({ id:user._id,
                    name:user.name,
                    role:user.role,
                    tasks:user.tasks,
                    email:user.emailId},process.env.SECRETKEY,{algorithm:'HS256',expiresIn:'2d'})
                resp.status(200).json({
                    status:200,
                    user:{
                        id:user._id,
                        name:user.name,
                        role:user.role,
                        tasks:user.tasks,
                        emailId:user.emailId
                    },
                    accessToken:token
                })
            }else{
                resp.status(401).json({
                    status:401,
                    message:'Password in correct'
                })
            }
        }else{
            resp.status(401).json({
                status:401,
                message:'User not found'
            })
        }
         
    }catch(err){
        console.log(err)
        resp.status(500).json({
            status:500,
            message:'Server error'
        })
    }

}

module.exports={
    login
}
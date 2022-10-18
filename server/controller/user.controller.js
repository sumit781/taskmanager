const db = require("../models")

const getUsers=async (req,res,next)=>{
    try{
        const users=await db.USERS.find({},'-password -__V')
        if(users){
            res.status(200).json({message:'successfull',users,status:200})
        }
    }catch(err){
            res.status(502).json({message:'something went wrong',status:501})
    }
}


module.exports={
    getUsers
}
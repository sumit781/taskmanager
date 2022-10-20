const db=require('../models')

const jwt=require('jsonwebtoken')
const jwtTokenVerification=async (req,res,next)=>{
    console.log(req.headers)
   const {accesstoken}=req.headers
    try{
        const result= jwt.verify(accesstoken,process.env.SECRETKEY,{
         complete:true
        })
        if(result){
            console.log(result,'//// jwt verification')
            const data=await db.USERS.find({_id:result._id})
            if(data){
                next()
            }else{
                res.statu(401).json({
                    status:401,
                    message:"unauthorized access"
                })
            }
        }
    }catch(error){
        console.log(error, '/// error during verification')
        return res.status(401).json({
            status:401,
            message:"unauthorized access"
        })

    }

}

module.exports={
    jwtTokenVerification
}
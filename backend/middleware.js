const jwt=require("jsonwebtoken");
const JWT_SECRET=require("./config");

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.json({msg:"invalid token"})
    }

    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        req.userId=decoded.userId;
        next();
    }
    catch(err){
        console.log(err);
        return res.json({msg:"error in jwt verification"})
    }
}
module.exports={
    authMiddleware
}
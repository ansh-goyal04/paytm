const express = require("express");
const router = express.Router();
const zod=require("zod");
const {User, Account}=require("../db");
const jwt=require("jsonwebtoken");
const JWT_SECRET=require("../config");
const { authMiddleware } = require("../middleware");

const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()

})
router.post('/signup',async(req,res)=>{
    const body=req.body;
    const result=signupSchema.safeParse(req.body);
    if(!result.success){
        return res.json({msg:"invalid inputs"});
    }
    const user=await User.findOne({
        username:body.username
    });
    if(user){
        return res.json({
            msg:"Email already exists"
        })
    }
    const dbUser=new User(body);
    await dbUser.save();
    
    const dbAccount=new Account({
        userId:dbUser._id,
        balance:1+ Math.random()*10000
    });
    await dbAccount.save();

    const token=jwt.sign({
        usedId:dbUser._id
    },JWT_SECRET);

    res.json({
        msg:"User registered succesfully",
        token:token
    });
});

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
});

router.post('/signin',async (req,res)=>{
    const {success}=signinBody.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"Inavalid inputs"
        })
    }

    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    });

    if(user){
        const token=jwt.sign({
            userId:user._id
        },JWT_SECRET);

        return res.json({
            msg:"user signed in succesfully",
            token:token
        })
    }

   
});

const updatedSchema=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
});

router.put('/',authMiddleware,async(req,res)=>{
    const {success}=updatedSchema.safeParse(req.body);
    if(!success){
        return res.json({
            msg:"invalid inputs"
        })
    }
    if(req.userId){
        const user=await User.findByIdAndUpdate(req.userId,req.body);
        console.log(user);
        return res.json({
            msg:"user updated succesfully"
        })
    }
});

router.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{$regex:filter,$options:"$i"}
        },
        {
            lastName:{$regex:filter,$options:"$i"}
        }
    ]
    });
    res.json({
        user:users.map((user)=>(
            {
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }
        ))
    })
})

module.exports=router;
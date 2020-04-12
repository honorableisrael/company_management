const dbUsers = require('../model/user.model');

function userAuthModel (){
   return (req,res,next)=>{
        console.log(req.headers)
        if(req.headers && req.headers.token ===''){
            res.status(400).json({
                message:"User authentication required",
            })
        }
        if(!req.headers.token || req.headers.token ==''){
            res.status(400).json({
                message:"User authentication required",
            })
        }
        else{
           const token = req.headers.token
            dbUsers.findByToken(token,(err,user)=>{
                if(err) throw err
                if(user) next();
            });
        }
    }
    next()
}

module.exports = userAuthModel;
var express = require('express');
var router = express.Router()
var dbUsers = require('../model/user.model');

var paginatedModel = require('../middleware/pagination_middleware');

const Users = [
    { name:'User 1', id:1 },
    { name:'User 2', id:2 },
    { name:'User 3', id:3 },
    { name:'User 4', id:4 },
    { name:'User 5', id:5 },
    { name:'User 6', id:6 },
    { name:'User 7', id:7 },
    { name:'User 8', id:8 },
    { name:'User 9', id:9 },
    { name:'User 10', id:10 },
    { name:'User 11', id:11 },
    { name:'User 12', id:12 },
    { name:'User 13', id:13 },
    { name:'User 14', id:14 },
    { name:'User 15', id:15 },
    { name:'User 16', id:16 },
    { name:'User 17', id:17 },
    { name:'User 18', id:18 },
    { name:'User 19', id:19 },
    { name:'User 20', id:20 },
]

router.get('/',paginatedModel(Users),(req,res)=>{
    res.json(res.paginatedModel);
})

router.post('/user',(req,res)=>{
    const users = new dbUsers({...req.body,category:[{name:'',age:'',grade:'',_class:''}]})
    console.log(users)
    users.save()
    .then(response=>{
        res.send(201)
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})

//a route to update the user category schema 
 router.put('/add_category/:username',(req,res) =>{
    let user_name = req.params.username
   let doc = dbUsers.findOne({name:user_name})
    .then(async (res1)=>{
        const { name,age,grade,_class } = req.body
        res1.category=[{ name,age,grade,_class } ]
        await res1.save()
        .then(res2=>{
            console.log(res2)
            res.json({
                message:"Update successful",
                status:200
            })
        })
        .catch(err=>{
            res.json({
                message:"failed to update",
                reason:err
            })
        })
    })
    .catch(err2=>{
        res.status(404).json({
            message:"failed to update, user not found",
            reason:err2
        })
    })  
    // console.log(doc)
})

//get all users
router.get('/users',(req,res)=>{
    dbUsers.find()
    .then(response=>{
        res.json(response)
    })
    .catch(err=>{
        console.log(err)
        res.json(err)
    })
})

module.exports = router
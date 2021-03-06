const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var saltIteration = 10;
var jwt = require('jsonwebtoken');


var studentSchema = new Schema({
    name:String,
    age:Number,
    grade:Number,
    _class:String,
})

var userSchema = new Schema({
    name:String,
    username:{
        type:String,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true 
    },
    gender:{
        type:String,
        capitalize:true,
        enum:["Fale","Female"],
    },
    company:[{ref:'company',type:Schema.Types.ObjectId}],
    ocupation:{
        type:String,
    },
    category:[studentSchema],
    token:String
})

    userSchema.pre('save',function(next,doc){
        var user = this;
        console.log(user.isNew)
        if(user.isNew || user.isModified('password')){  //if the user is new or modified hash algorithm runs if it is 
            bcrypt.genSalt((saltIteration),function(error,salt){
                if(error){
                    return console.log(error)
                }
                bcrypt.hash(user.password,salt,function(err,hashedPassword){
                    if (err) return next(err)
                    user.password = hashedPassword;
                    console.log( "schema new user password" + user.password )
                    next();
                })
            })
        }
        else{
            next()
        }
    })
    userSchema.methods.comparePassword = function(candidatePassword,cb){
        bcrypt.compare(candidatePassword.toString(),this.password,function(error,ismatch){
            if(error) throw error
            return cb(null,ismatch)
        })
    }
    //methods are applied 
    userSchema.methods.generateToken = function(cb){
        var user = this;
        var secretkey = 'specailsecretword';
        const generatedToken = jwt.sign(user._id.toString(16),secretkey);
        user.token = generatedToken;
        user.save((err,userWithUpdatedToken)=>{
            if (err) return cb(err,null);
            cb(null,userWithUpdatedToken);
        })
    }
    userSchema.statics.findByToken = function(token,cb){
        var user = this;
        console.log(user)
        user.findOne({token})
        .then(doc=>{
            cb(null,doc)
        })
        .catch(err=>{
            cb(err,null)
        })
    }

const student = mongoose.model('student',studentSchema);
const Users = mongoose.model('Users',userSchema);
module.exports = Users;

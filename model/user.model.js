const mongoose = require('mongoose');
var Schema = mongoose.Schema;



var studentSchema = new Schema({
    name:String,
    age:Number,
    grade:Number,
    _class:String,
})

var userSchema = new Schema({
    name:String,
    gender:{
        type:String,
        enum:["Male","Female"],
    },
    company:[{ref:'company',type:Schema.Types.ObjectId}],
    ocupation:{
        type:String,
    },
    category:[studentSchema],
    token:String
})


const student = mongoose.model('student',studentSchema);
const Users = mongoose.model('Users',userSchema);
module.exports = Users;

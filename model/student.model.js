const mongoose = require('mongoose')
var Schema = mongoose.Schema;


var studentSchema = new Schema({
    name:String,
    age:Number,
    grade:Number,
    _class:String,
})

const student = mongoose.model('student',studentSchema);
module.exports = student
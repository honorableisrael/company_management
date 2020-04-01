const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const parentSchema = new Schema({
    marraigeStatus:{
        type:String,
        enum:["Married","Divorced"]
    },
    marriageDate:Date
})

const parent = mongoose.model('parent',parentSchema);
module.exports = parent;
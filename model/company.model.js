const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
    bussinessName:String,
    numberOfStaffs:Number,
    email:String,
    totalNumberOfClients:Number,
    totalNumberOfAdmins:Number,
    clients:[{ref:'user',type:Schema.Types.ObjectId}],
    admin:[{ref:'admin',type:Schema.Types.ObjectId}]
})

const company = mongoose.model('company',companySchema);
module.exports = company;
const mongoose = require('mongoose');
const Schema  = mongoose.Schema;


const referredUsers = new mongoose.Schema({
    name:String,
    createdAt: {type: Date, default: Date.now},
    phone:Number,
    address:String,
    referredBy:[{
        type:Schema.Types.ObjectId,
        ref:'admin'
    }]
})

const admin_referred = mongoose.model('Reffered',referredUsers);

module.exports = admin_referred;
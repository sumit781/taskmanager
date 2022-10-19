const mongoose=require('mongoose');
const user = require('../user');

const task = new mongoose.Schema({
    title:  String,
    assignedTo: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    description: {
        type:String,
        required:true
    },
    status:{type:String,default:'Pending'},
    date: { type: Date, default: Date.now },
  });

  module.exports=mongoose.model("task",task)
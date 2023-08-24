const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const TodoSchema=new Schema(
    {
        text:{
            type:String,
            required:true
        },
        complete:{
            type:Boolean,
            required:false
        },
        timestamp:{
            type:String,
            default:Date.now()
        }
    });

const Todo=mongoose.model("Todo",TodoSchema);
module.exports=Todo;
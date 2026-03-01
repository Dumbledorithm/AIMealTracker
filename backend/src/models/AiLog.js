import mongoose from 'mongoose';

const AiLog = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    type:{
        type:String,
        enum:["estimate","meal-plan","image-estimate"],
        default:"estimate"
    },
    input:{
        type:String,
        required:true,
    },
    output:{
        type:Object,
        required:true
    },
},{timestamps:true})

export default mongoose.model("AiEstimate",AiLog);
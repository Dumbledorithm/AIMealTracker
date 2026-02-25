import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    date:{
        type:String,
        required:true
    },
    mealType:{
        type:String,
        enum:["breakfast","lunch","dinner","snacks"],
        required:true
    },
    foodId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Food",
        required:true
    },
    quantity:{
        type:Number,
        default:1
    },
    totalCalories:{
        type:Number,
        required:true
    },
    totalProtein:{
        type:Number,
        default:0
    },
    totalCarbs:{
        type:Number,
        default:0
    },
    totalFats:{
        type:Number,
        default:0
    }

},
{timestamps:true})

export default mongoose.model("Log",logSchema);
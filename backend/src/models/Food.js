import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true,
        trim:true
    },
    calories:{
        type:Number,
        default:0
    },
    protein:{
        type:Number,
        default:0
    },
    carbs:{
        type:Number,
        default:0
    },
    fats:{
        type:Number,
        default:0
    }
    
},
{timestamps:true});

export default mongoose.model("Food",foodSchema);
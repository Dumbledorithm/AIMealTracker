import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        select:false
    },
    age:{
        type:Number,
        required:true
    },
    weight:{
        type:Number,
        required:true
    },
    goal:{
        type:String,
        enum:['lose','gain','maintain'],
        default:'maintain'
    },
    dailyCalorieTarget:{
        type:Number,
        required:true
    }
},
{timestamps:true})


export default mongoose.model('User',userSchema);
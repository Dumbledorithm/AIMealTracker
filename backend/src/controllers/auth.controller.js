import User from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


//helper function to calculate bmr

const calculateDailyCalories = (age,height,weight,goal) => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;

    let calories = bmr*1.2;

    if(goal == 'lose') calories-=300;
    if(goal == 'gain') calories+=300;

    return Math.round(calories);
}


export const signup = async(req,res) => {
    try{
        const {name,email,password,age,height,weight,goal} = req.body;

        //check if user exists
        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({
                message:"Email already registered"
            })
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //calculate daily target
        const dailyCalorieTarget = calculateDailyCalories(
            age,
            height,
            weight,
            goal
        )

        //create user

        const user = await User.create({
            name,
            email,
            password:hashedPassword,
            age,
            height,
            weight,
            goal,
            dailyCalorieTarget
        })

        //create token
        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"7d"}
        )


        return res.status(201).json({
            message:"User created successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                dailyCalorieTarget:user.dailyCalorieTarget
            }
        })

    }catch(error){
        console.error("Signup error",error.message);
        res.status(500).json({message:"Server error"});
    }

}


export const login = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.find({email}).select('+password');
        if(!user){
            return res.status(400).json({message:"Invalid credentials"})
        }

        const passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return res.status(400).json({message:"Incorrect password"});
        }

        const token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        user.password= undefined;

        return res.status(201).json({
            message:"Successful login",
            token,
            user
        })

    }catch(error){
        console.error("Login error",error.message);
        return res.status(500).json({
            message:"Server error"
        })
    }
}
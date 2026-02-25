import Log from '../models/Log';
import Food from '../models/Food';
import dayjs from 'dayjs';

export const addLog = async(req,res) => {
    try{
    const { mealType, foodId, quantity, date} = req.body;
    const userId = req.user.id;

    if(!mealType || !foodId || !quantity || !date){
        return res.status(400).json({message:"All fields are required"});
    }

    //fetch food from the model 
    const food = await Food.findById(foodId);
    if(!food){
        return res.status(404).json({message:"Food not found"});
    }

    //calculate totals
    const totalCalories = food.calories * quantity;
    const totalProtein = food.protein * quantity;
    const totalCarbs = food.carbs * quantity;
    const totalFats = food.fats * quantity;

    const log = await Log.create({
        userId,
        date,
        mealType,
        foodId,
        quantity,
        totalCalories,
        totalProtein,
        totalCarbs,
        totalFats
    })

    res.status(201).json({
        message:"Log added successfully",
        log
    });
    }catch(error){
        console.error("add log error :",error);
        res.status(500).json({message:"Server error"})
    }
}

export const getLogsByDay = async(req,res) => {
    try{
        const userId = req.user.id;
        const {date} = req.query;

        if(!date){
            return res.status(400).json({message:"Date is required in (yyyy-mm-dd)"});
        }

        const logs = await Log.find({userId,date}).populate('foodId');
        res.json(logs);

    }catch(error){
        console.error("Get logs by date error",error);
        res.status(500).json({message:"Internal server error"});

    }
}


export const getWeeklyLogs = async(req,res) => {
    try{
        const userId = req.user.id;

        const today = dayjs();
        const last7Days = [];

        for (let i = 0; i < 7; i++) {
        last7Days.push(today.subtract(i, "day").format("YYYY-MM-DD"));
    }

     const logs = await Log.find({
            userId,
            date: {$in: last7Days},

        }).populate('foodId');

        res.json(logs);

    }catch(error){
        console.error("Weekly logs error:",error);
        res.status(500).json({message:"Server error"});
    }

}


export const deleteLog = async(req,res) => {
    try{
        const log = await Log.findByIdAndDelete(req.params.id);

        if(!log){
            res.status(400).json({message:"Log to be deleted not found"});
        }
        res.json({message:"Log deleted successfully"});

    }catch(error){
        console.error("Delete log error:",error);
        res.status(500).json({message:"server error"});
    }
};


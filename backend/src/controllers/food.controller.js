import Food from "../models/Food";

export const createFood = async(req,res) => {
    try{
        const {name,calories,protein,carbs,fats} = req.body;

        if(!name || !calories){
            res.status(401).json({
                message:"Name and calories are required"
            })
        }

        const food = await Food.create({
            name,
            calories,
            protein,
            carbs,
            fats
        })

        res.status(201).json({
            message:"Food added successfully",
            food
        })

    }catch(error){
        console.error("Create Food error:",error.message);
        res.status(400).json({message:"Server error"});

    }
}

export const getFood = async(req,res) => {
    try{
        const foods = await Food.find().sort({createdAt:-1});
        res.json(foods);

    }catch(error){
        console.error("Get food error:",error.message);
        res.status(400).json({message:"Server error"
        });

    }
}

export const getFoodById = async(req,res) => {
    try{
        const food = await Food.findById(req.params.id);

        if(!food){
            return res.status(404).json({message:"Food not found" });
        }

        res.json(food);

    }catch(error){
        console.error("Get Food error:",error.message);
        res.status(500).json({message:"Server error"});
    }
}

export const updateFood = async(req,res) => {
    try{
        const updated = await Food.findByIdandUpdate(
            req.params.id,
            req.body,
            {new:true}
        )

        if(!updated){
            return res.status(404).json({Message:"food not found"});
        }

        res.json({
            message:"Food updated successfully",
            food:updated
        });


    }catch(error){

        console.error("Error occured in update Food",error.message);
        res.status(500).json({message:"Server error"});

    }
}


export const deleteFood = async(req,res) => {
    try{
        const deleted = await Food.findByIdAndDelete(req.params.id);

        if(!deleted){
            return res.status(404).json({message:"Could not find the food to be deleted"});
        }

        res.json({message:"Food deleted successfully"});
        }catch(error)
        {
            console.error("Error in deleting food:",error.message);
            res.status(500).json({message:"Server error"});


    }
}
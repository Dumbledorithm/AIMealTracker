import AiEstimate from '../models/AiLog.js';
import {Groq} from "groq-sdk";
import dotenv from 'dotenv';
dotenv.config();

const groq = new Groq({apiKey:process.env.GROQ_API_KEY});


export const estimateCalories = async(req,res) => {
    try{
        const {text} = req.body;
        const userId = req.user.id;

        if(!text){
            return res.status(400).json({message:"Text input is required"});
        }


        const prompt = `You are a nutrition expert. The user will describe food they ate.
Your job is to estimate the calories and macros.

Very important:
- Respond in STRICT JSON format ONLY.
- No extra text.
- No explanations.
- No markdown.

JSON structure:
{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "items": [
      {
        "name": string,
        "calories": number,
        "protein": number,
        "carbs": number,
        "fats": number
      }
  ]
}

Now estimate nutrition for: "${text}".
`;

const completion = await groq.chat.completions.create({
    model:"llama-3.1-8b-instant",
    messages:[
         { role: "system", content: "You are a strict JSON nutrition estimator." },
        { role: "user", content: prompt }
    ],
    temperature:0.2
});

    let aiResponse = completion.choices[0].message.content;
    let result;
    try{
        aiResponse = aiResponse.replace(/```json|```/g,"").trim();
        result = JSON.parse(aiResponse);
    }catch(error){
        console.error("Json Parse error:",error);
        return res.status(500).json({
            message:"Ai returned invalid JSON",
            raw:aiResponse
        });
    }


    const log = await AiEstimate.create({
        userId,
        type:"estimate",
        input:text,
        ouptut:result
    });

    res.json({
        message:"Estimation successful",
        data:result,
        logId:log._id
    })
    }catch(error){
        console.error("AI estimate error",error);
        res.status(500).json({message:"Server error"});
    }
}
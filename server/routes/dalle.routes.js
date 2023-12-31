 import express from 'express'
 import * as dotenv from 'dotenv'
 import {Configuration,OpenAIApi} from 'openai'





 dotenv.config()


 const router =express.Router()

 const configuration=new Configuration({
   
    apiKey:process.env.OPENAI_API_KEY
 })

 const openai =new OpenAIApi(configuration)

 router.route('/').get((req,res)=>{
    res.status(200).json({msg:"rzag"})
 }) 
 router.route('/').post(  async(req,res)=>{
    try {
        console.log(req.body);
        const {prompt}=req.body
        console.log(prompt);
        if(!prompt){
            res.status(400).json({msg:"prompt is required"})
        }
        
        const response=await openai.createImage({
            
            prompt,
            n:1,
            size:'1024x1024',
         response_format: 'b64_json'
           
            
           

          

        })
     const image = response.data.data[0].b64_json;
        
        res.status(200).json({photo:image})
        
    } catch (error) {
        
        res.status(500).json({msg:"server error"})
        
    }
  
 })
 export default router

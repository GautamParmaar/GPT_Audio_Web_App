const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const ejs = require("ejs");
const axios = require("axios");
const serverless = require("serverless-http")
const router = express.Router();
const app=express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
require('dotenv').config();



app.get('/',(req,res)=>{
    return res.render(path.join(__dirname,"/index.ejs"))

})
app.post('/',async(req,res)=>{
    const question=req.body.prompt;
try{
    const options = {
        method: 'POST',
        url: 'https://chatgpt53.p.rapidapi.com/',
        headers: {
          'content-type': 'application/json',
          'X-RapidAPI-Key': process.env.CHATGPT_API_KEY,
          'X-RapidAPI-Host': 'chatgpt53.p.rapidapi.com'
        },
        data: {
          messages: [
            {
              role: 'user',
              content: question,//we are passing question of end user through this question variable
            }
          ],
          temperature: 1
        }
      };
      
      
      
          const response = await axios.request(options);
          console.log(response.data.choices[0].message.content);
          return res.render(path.join(__dirname,"/index.ejs"),{employee:response})//employee is variable in which we are getting response from backend in JSON format from response variable

    }catch(error){
      res.json({"error": "internal server error"})
    }

      

      
})
app.listen(3001, function () {
    console.log(`server is running on the port 3001!`);
  });
  


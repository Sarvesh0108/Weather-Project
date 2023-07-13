const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const app_key="7fafe4f14b4f0c7ac8992822c6d6a47a";
  const unit="metric";


  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+app_key+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const WeatherData=JSON.parse(data);
      const temp=WeatherData.main.temp;
      const description= WeatherData.weather[0].description;
      const icon=WeatherData.weather[0].icon;
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<p>The weather is currently "+description+"</p>");
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
})



app.listen(3000,function(){
  console.log("Server is running on port 3000");
});

const express = require("express");
const mainRouter = require("./routes");
const app=express();

app.use('/api/v1',mainRouter);

app.listen(3000,()=>{
    console.log("listening to port 3000");
})
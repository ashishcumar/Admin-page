const express = require('express');
const app =  express();
const port =process.env.PORT || 8080;
const path = require('path')
const http = require('http').createServer()

app.use(express.json())
app.use(express.static(path.join(__dirname,"../views")))

app.listen(port,()=>{console.log('port started at 8080 :) ')})

app.get('',(req,res)=>{res.sendFile(path.join(__dirname,"../views/index.html"))})
app.get('*',(req,res)=>{res.send("<h1>oops didn't found your request! </h1>")})

console.log(path.join(__dirname,"../views"))
const express=require('express');
const mongoose=require("mongoose");
const cors=require("cors");
const app=express();
require('dotenv').config();
app.use(express.json());
app.use(cors());
const Todo=require('./models/Todo')



const portmade = app.listen(process.env.PORT);
if(portmade) {console.log(`Server running at port ${process.env.PORT}`);}


const dbConnect = mongoose.connect(process.env.CONNECTION_STRING);
if(dbConnect) {console.log(`Database connected`)}

app.get('/todos', async(req,res)=>{
    const todos=await Todo.find();
    res.json(todos);
});

app.post('/todo/new',async(req,res)=>{
    const text= req.body;
    
    const add = await Todo.create(text);
    res.send(text)
});
app.delete('/todo/delete/:id',async(req,res)=>{
    const result=await Todo.findByIdAndRemove(req.params.id);
    res.json({result});
});
app.get('/todo/complete/:id',async(req,res)=>{
    const todo=await Todo.findById(req.params.id);
    todo.complete=!todo.complete;
    todo.save();
    res.json(todo);
})




const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoute = require('./api/routes/blog');
const categoryRoute = require('./api/routes/category');
const authRoute = require('./api/routes/auth');
const commentRoute = require('./api/routes/comment');
const contactRoute = require('./api/routes/contact');
const cors = require('cors');

mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('connected',()=>{
    console.log('connected with database')
})

mongoose.connection.on('error',(err)=>{
    console.log('connection failed')
    console.log(err)
})
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(cors())

app.use('/blog',blogRoute)
app.use('/category',categoryRoute)
app.use('/auth',authRoute)
app.use('/comment',commentRoute)
app.use('/contact', contactRoute);

app.use((req,res)=>{
    res.status(200).json({
        msg:'bad request'
    })
})




module.exports = app;
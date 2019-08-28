require('dotenv').config()

const {
    MONGO_URI:mongoURI,
} = process.env

const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(mongoURI, {useNewUrlParser:true}).then(()=>{
    console.log('connected to mongodb')
}).catch((e)=> {
    console.error(e)
})

const { Schema } = mongoose
const todo = new Schema({
    date:Date,
    title:String,
    writer:String,
    contents:String,
    complete:Boolean,
    createAt:Date,
})

module.exports.ToDo = mongoose.model('ToDo', todo, 'todos')

const mongoose = require('mongoose')
const validator = require('validator')

const bookSchema = new mongoose.Schema({
    id: {
        type: String
    },
    author:{
        type: String
    },
    title:{
        type: String
    },
    genre:{
        type: String
    },
    price:{
        type: Number
    },
    publish_date:{
        type: Date
    },
    description:{
        type: String,
    }
},{
    timestamps:true
})

const Book = mongoose.model('Book',bookSchema)

module.exports = Book
const mongoose = require('mongoose');

 const categorySchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    imageUrl:String,
    publicId:String
})

module.exports = mongoose.model('Category',categorySchema)
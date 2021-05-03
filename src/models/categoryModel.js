const mongoose = require('mongoose');
const Schema = mongoose.Schema

const category = new Schema({
    name:{
        type:String,
        required:true
    },
    // photo:{
    //     type:String
    // }
    itemsId :[{
        type: Schema.Types.ObjectId,
        ref:"items"
    }]

},{
    timestamps: true
})

module.exports = mongoose.model('category',category)
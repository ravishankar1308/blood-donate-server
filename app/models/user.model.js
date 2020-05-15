const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');


// const location   = new Schema({
//     latitude: String,
//     longitude: String
// });

const schema = new Schema({
    email:{type:String,required:true,unique:true},
    name:{type:String,required:true,unique:true},
    password:{type:String,required: true},
    age:{type:Number,required: true},
    bloodType:{type:String},
    donate:{type:Boolean,default: false},
    verifyUser:{type:Boolean,default: false},
    role:{type:Schema.Types.ObjectId, ref:'Role',required: true}
}).method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});
schema.plugin(uniqueValidator);


module.exports = mongoose.model('User',schema);

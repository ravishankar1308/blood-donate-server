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
    donate:{type:String,default: 'false'},
    verifyUser:{type:String,default: 'false'},
    donateDate:{ type: Date,default:null},
    role:{type:Schema.Types.ObjectId, ref:'Role',required: true}
},{timestamps: true})
.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});



module.exports = mongoose.model('User',schema);

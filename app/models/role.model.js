const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const schema = new Schema({
    name:{type:String,required:true},
}).method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});

module.exports = mongoose.model('Role',schema);
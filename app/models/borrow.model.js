const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        borrowUser:{type:Schema.Types.ObjectId, ref:'User',required: true},
        borrowBook:{type:Schema.Types.ObjectId, ref:'Book',required: true},
        status: {type:String},
    },
    {timestamps: true}
).method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('Borrow', schema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        accidentUser: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
        description:String,
        status: {type: String},
    },
    {timestamps: true}
).method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('Accident', schema);


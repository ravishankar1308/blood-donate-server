const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
        user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        longitude: {type: String},
        latitude: {type: String},
    },
    {timestamps: true}
)
    .method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});


module.exports = mongoose.model('Location', schema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
        bookName: {type:String,required:true,unique:true},
        author: {type:String,
            required:true,
        },
        bookNumber: {type:String,
            // required:true,
            // unique:true
        },
        category: {type:String,
            // required:true
        },
    },
    {timestamps: true}
).method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
});
schema.plugin(uniqueValidator);


module.exports = mongoose.model('Book', schema);


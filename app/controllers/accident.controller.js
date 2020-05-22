const config = require("../config/auth.config");

const User = require('../models/user.model');
const Role = require('../models/role.model');
const Accident = require('../models/accident.model');
const Location = require('../models/location.model');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = async (req, res) => {
    if (!req.body.latitude || !req.body.longitude) {
        await res.status(400).send("Some thing wrong with getting location");
        return;
    }
    // console.log(latitude,latitude);
    // console.log({asss:req.body.accidentUser});
    Location.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        user: req.body.accidentUser,
    }, function (err, location) {
        if (err) return res.status(500).send("There was a problem request");
        {
            Accident.create({
                accidentUser: req.body.accidentUser,
                description: req.body.description,
                location: location.id,
                status: 'Pending',
            }, function (err,accident){
              if (err) return res.status(500).send("There was problem with requsting accident");
                res.status(200).send(location);
            } )
        }
    });
};


// exports.create = async (req, res) => {
//
//     if (!req.body.latitude || !req.body.longitude) {
//         await res.status(400).send("Some thing wrong with getting location");
//         return;
//     }
//     Accident.create({
//         accidentUser: req.body.accidentUser,
//         description: req.body.description,
//         location: new Location({latitude:req.body.latitude,longitude:req.body.longitude,user:req.body.user}),
//         status: 'Pending',
//     }, function (err, location) {
//
//         if (err) return res.status(500).send("There was a problem request");
//         {
//             res.send(location);
//         }
//     });
// };

//list of accident By user id
exports.findByUser = (req, res) => {
    const accidentUser = req.query.accidentUser;
    // const status = req.query.status;
    // const condition = Name ? { bookName: { $regex: new RegExp(Name), $options: "i" } } : {};

    Accident.find({
       accidentUser:accidentUser
    }).populate('location').populate('accidentUser')
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//All accident list
exports.findAll = (req, res) => {
    const id = req.query.id;
    const condition = id ? { id: { $regex: new RegExp(id), $options: "i" } } : {};
    Accident.find(  )
    .populate('location').populate('accidentUser').populate('donarUser')
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

//find accident data by accident id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Accident.findOne( {_id:id} )
        .populate('location').populate('accidentUser')
        .then(data =>{
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    console.log(id)

    Accident.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Accident with id=${id}. Maybe accident was not found!`
                });
            } else res.send('success');
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};


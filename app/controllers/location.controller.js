const config = require("../config/auth.config");

const User = require('../models/user.model');
const Role = require('../models/role.model');
const Location = require('../models/location.model');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.create = async (req, res) => {

    if (!req.body.latitude || !req.body.longitude) {
        await res.status(400).send("Some thing wrong with getting location");
        return;
    }
    if (!req.body.user) {
        await res.status(400).send("some thing wrong");
        return;
    }
    Location.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        user: req.body.user,
    }, function (err, location) {
        if (err) return res.status(500).send("There was a problem request");
        res.status(200).send({location:location.id});
    });
};

exports.create = async (req, res) => {

    if (!req.body.latitude || !req.body.longitude) {
        await res.status(400).send("Some thing wrong with getting location");
        return;
    }
    if (!req.body.user) {
        await res.status(400).send("some thing wrong");
        return;
    }
    Location.create({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        user: req.body.user,
    }, function (err, location) {
        if (err) return res.status(500).send("There was a problem request");
        res.status(200).send({location:location.id});
    });
};

exports.findOne = (req, res) => {
    const id = req.query.id;
    // const condition = Name ? { bookName: { $regex: new RegExp(Name), $options: "i" } } : {};

// console.log(condition);
//     Accident.findAll({description: description,status:status})
    Location.findOne({_id:id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving location."
            });
        });
};
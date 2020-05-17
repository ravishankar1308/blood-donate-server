const config = require("../config/auth.config");

const User = require('../models/user.model');
const Role = require('../models/role.model');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signup = async (req, res) => {

    if (!req.body.email || !req.body.password) {
        await res.status(400).send("Email And Password required");
        return;
    }
    if (!req.body.role) {
        await res.status(400).send("Some Thing Wrong!");
        return;
    }
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    const findRole = await Role.findOne({name: {$in: req.body.role}});

    User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword,
        age: req.body.age,
        bloodType: req.body.bloodType,
        donate: req.body.donate,
        verifyUser: req.body.verifyUser,
        role: findRole.id
    }, function (err, user) {
        if (err) return res.status(500).send("There was a problem registering the user`.");

        // if user is registered without errors
        // create a token
        var token = jwt.sign({id: user.id, role: findRole.name}, config.secret,
            // {expiresIn: 86400}
        );

        res.status(200).send({auth: true, token: token, role: findRole.name, user: user});
    });

};

exports.resolve = (req, res, next) => {
    try {
        const token = req.body.token;
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err)
                return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});

            // if everything is good, save to request for use in other routes
            const role = decoded.role;
            const id = decoded.id;
        res.send({role:role,id:id})
        });

    } catch (e) {

    }
};

exports.signin = async (req, res) => {

    await User.findOne({email: req.body.email}, async function (err, user) {
        if (err) return res.status(500).send('Error on the server.');
        if (!user) return res.status(404).send('No user found.');

        // check if the password is valid
        var passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.status(401).send('Incorrect Password');
        // if (!passwordIsValid) return res.status(401).send({auth: false, token: null});


        const roleId = await Role.findOne({_id: user.role});
        // await console.log(roleName);
        // if user is found and password is valid
        // create a token
        var token = await jwt.sign({id: user.id, role: roleId.name}, config.secret,
            // {expiresIn: 86400 }
        );

        // return the information including token as JSON
        res.status(200).send({auth: true, token: token, role: roleId.name,user:{id:user.id}});
    });

};

exports.findAll = (req, res) => {
    const Name = req.query.email;


    const condition = Name ? {email: {$regex: new RegExp(Name), $options: "i"}} : {};
// console.log(condition);
    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving User."
            });
        });
};
exports.findOne = (req, res) => {
    const id = req.params.id;
    User.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Book with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Book with id=" + id });
        });
};


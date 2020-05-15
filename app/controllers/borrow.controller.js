// const db = require("../models");
// const Book = db.book;
const Borrow = require('../models/borrow.model');
const Book = require('../models/book.model');
const User = require('../models/user.model');

exports.test = (req, res) => {
    res.send('borroe control');
};

exports.create = async (req, res) => {
    // Validate request
    if (!req.body.borrowBook || !req.body.borrowUser) {
        await res.status(400).send("Content can not be empty!");
        return;
    }
    const borrowUserId = await User.findOne({email: req.body.borrowUser});
    const borrowBookId = await Book.findOne({bookName: req.body.borrowBook});


    const borrow = await new Borrow({
        borrowUser: borrowUserId.id,
        borrowBook: borrowBookId.id,
        status: 'Taken'
    });

    await borrow
        .save(borrow)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the borrow."
            });
        });

};

exports.findAll = (req, res) => {
    const Name = req.query.bookName;
    var condition = Name ? {bookName: {$regex: new RegExp(Name), $options: "i"}} : {};
// console.log(condition);
    Book.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving borrow."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({message: "Not found borrow with id " + id});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Error retrieving borrow with id=" + id});
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, {useFindAndModify: false})
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update borrow with id=${id}. Maybe borrow was not found!`
                });
            } else res.send({message: "borrow was updated successfully."});
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating borrow with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete borrow with id=${id}. Maybe borrow was not found!`
                });
            } else {
                res.send({
                    message: "borrow was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete borrow with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} borrow were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all borrow."
            });
        });
};

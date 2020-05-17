// const db = require("../models");
// const Book = db.book;
const Book =require('../models/book.model');

exports.create = async (req, res) => {
    // Validate request
   if (!req.body.bookName) {
        await res.status(400).send("Content can not be empty!" );
        return;
    }

    const book =await new Book({
        bookName: req.body.bookName,
        author: req.body.author,
        category:req.body.category,
        bookNumber: req.body.bookNumber
    });

   await book
        .save(book)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the book."
            });
        });


};

exports.findAll = (req, res) => {
    const email = req.query.email;
    const age = req.query.age;
    // const condition = Name ? { bookName: { $regex: new RegExp(Name), $options: "i" } } : {};

// console.log(condition);
    Book.findAll({email: email,age:age})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
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

exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}. Maybe Book was not found!`
                });
            } else res.send({ message: "Book was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;

    Book.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Book with id=${id}. Maybe Book was not found!`
                });
            } else {
                res.send({
                    message: "Book was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
        });
};

exports.deleteAll = (req, res) => {
    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Books."
            });
        });
};

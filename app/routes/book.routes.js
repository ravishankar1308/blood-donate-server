const book = require("../controllers/book.controller");
const VerifyToken =require('../middlewares/VerifyToken');
const verify =require('../middlewares/VerifyUser');

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post(
        "/api/books",
        VerifyToken,
        verify.admin,
        book.create
    );

    app.get("/api/books",
        book.findAll);

    app.get("/api/books/:id",
        book.findOne
    );

    app.put(
        "/api/books/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        book.update
    );

    app.delete(
        "/api/books/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        book.delete
    );

    app.delete(
        "/api/books",
        // [authJwt.verifyToken, authJwt.isAdmin],
        book.deleteAll
    );
};

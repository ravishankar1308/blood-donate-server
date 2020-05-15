const borrow = require("../controllers/borrow.controller");
const VerifyToken =require('../middlewares/VerifyToken');
const verify =require('../middlewares/VerifyUser');

module.exports = (app) => {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.get(
        "/api/borrows/test",

        // verify.admin,
        borrow.test
    );


    app.post(
        "/api/borrows",
        // VerifyToken,
        // verify.admin,
        borrow.create
    );

    app.get("/api/borrows",
        borrow.findAll);

    app.get("/api/borrows/:id",
        borrow.findOne
    );

    app.put(
        "/api/borrows/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        borrow.update
    );

    app.delete(
        "/api/borrows/:id",
        // [authJwt.verifyToken, authJwt.isAdmin],
        borrow.delete
    );

    app.delete(
        "/api/borrows",
        // [authJwt.verifyToken, authJwt.isAdmin],
        borrow.deleteAll
    );
};

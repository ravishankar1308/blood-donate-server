const { verifySignUp } = require("../middlewares");
const VerifyToken =require('../middlewares/VerifyToken');
const accident = require("../controllers/accident.controller");
const verify =require('../middlewares/VerifyUser');

module.exports = function(app) {
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');
        next();
    });

    app.post("/api/accident",
        accident.create);

    app.get("/api/accident",
        accident.findAll);

    app.get("/api/accidents",
        accident.findByUser);

    app.get("/api/accident/:id",
        accident.findOne);

    app.put(
        "/api/accident/:id",
        accident.update
    );





};

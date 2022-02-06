const jwt = require('jsonwebtoken');

exports.validate = (req, res, next) => {
    try {
        let token = jwt.verify(req.headers.api_key, "cultivando");
        console.log(token);
        req.body.user = token;
        next();
    } catch(error) {
        next(new Error("Necessário fazer login"));
    }
}
const { Usuario } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Usuario.findAll({
        order: [['nome', 'ASC']],
        attributes: {
            exclude: ['senha']
        }
    })
    .then(
        values => {
            res.status(200).json(
                values
            )
        }
    )
    .catch(
        errors => {
            next(errors);
        }
    )
}

exports.getById = function(req, res, next) {
    Usuario.findByPk(req.params.idUsuario)
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        errors => next(errors)
    )
}

exports.post = function(req, res, next) {
    Usuario.create(req.body)
    .then(
        values => res.status(201).json(
            values
        )
    )
    .catch(
        errors => {
            next(errors);
        }
    )
}

exports.put = function(req, res, next) {

    let dados = {
        "idUsuario": req.body.idUsuario,
        "nome": req.body.nome,
        "email": req.body.email,
        "senha": req.body.senha,
        "imagePath": req.body.imagePath,
        "idEndereco": req.body.idEndereco
    }

    Usuario.putByID(dados, (error, data) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json(
                data
            )
        }
    });

}

exports.putById = function(req, res, next) {

    req.body["idUsuario"] = req.params.idUsuario;

    Usuario.putByID(dados, (error, data) => {
        if (error) {
            next(error);
        } else {
            res.status(200).json(
                data
            )
        }
    });
}

exports.delete = function(req, res, next) {
    Usuario.destroy({
        where: {
            "idUsuario": req.params.idUsuario
        }
    })
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        errors => next(errors)
    )
}

exports.updateImage = function(req, res, next) {

    Usuario.update(
        {
            imagePath: '/' + req.file.path.replace("\\", "/")
        },
        {
            where: {
                idUsuario: req.params.idUsuario
            }
        }
    )
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            error.status = 500;
            next(error);
        }
    )

};

exports.login = function(req, res, next) {
    
    Usuario.findAll({
        where: {
            "email": req.body.email
        }
    })
    .then(
        values => {
            if (values.length) {

                Usuario.validatePassword(req.body.senha, values, (error, auth) => {
                    
                    if (error) {
                        error.status = 500;
                        next(error);
                    } else {

                        if (!auth) {

                            res.status(200).json(
                                {
                                    "auth": false
                                }
                            )

                        } else {

                            Usuario.generateToken(values, (err, token) => {

                                if (err) {

                                    
                                        err.status = 500;
                                        next(err);

                                } else {

                                    res.status(201).json(
                                        {
                                            "auth": true,
                                            "token": token
                                        }
                                    )

                                }

                            });

                        }

                    }
                
                });
                    
            } else {

                res.status(404).json({
                    "auth": false
                });

            }
        }
    )
    .catch(
        errors => {
            next(erros);
        }
    )
}

exports.logout = function(req, res, next) {
    res.json();
}

exports.redefinePWD = function(req, res, next) {
    
    let senha = req.body.senha;

    Usuario.updatePWD(
        {
            "senha": senha,
            "email": req.body.user.email
        },
        (error, value) => {
            if (error) {
                next(error);
            } else {
                res.status(200).json(
                    {
                        "data": value
                    }
                )
            }
        }
    )
}

exports.postArray = function(req, res, next) {
    
    Usuario.bulkCreate(req.body)
    .then(
        value => res.status(200).json(
            {
                value
            }
        )
    )
    .catch(
        error => next(error)
    )

}
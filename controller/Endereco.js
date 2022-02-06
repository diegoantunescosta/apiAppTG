const { Endereco, Usuario } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Endereco.findAll()
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.getById = function(req, res, next) {
    Endereco.findByPk(req.params.idEndereco)
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.post = function(req, res, next) {
    Endereco.create(req.body)
    .then(
        values => res.status(201).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.put = function(req, res, next) {
    Endereco.upsert(req.body)
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.putById = function(req, res, next) {
    req.body["idEndereco"] = req.params.idEndereco;

    Endereco.upsert(dados)
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.delete = function(req, res, next) {
    Endereco.destroy({
        where: {
            "idEndereco": req.params.idEndereco
        }
    })
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.findByUser = function(req, res, next) {
    Usuario.findAll({
        where: {
            "idUsuario": req.params.idUsuario
        },
        include: [ Endereco ]
    })
    .then(
        values => res.status(200).json(
            values
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}
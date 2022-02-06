const { Cidade } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Cidade.findAll()
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
    Cidade.findByPk(req.params.idCidade)
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
    Cidade.create(req.body)
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
    Cidade.upsert(req.body)
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
    req.body["idCidade"] = req.params.idCidade;

    Cidade.upsert(req.body)
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
    Cidade.destroy({
        where: {
            "idCidade": req.params.idCidade
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

exports.findByState = function(req, res, next) {
    Cidade.findAll({
        where: {
            "idEstado": req.params.idEstado
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
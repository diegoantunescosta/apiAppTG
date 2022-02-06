const { Transacao, Produto } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Transacao.findAll({
        order: [ ['createdAt', 'ASC'] ]
    })
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.getById = function(req, res, next) {
    Transacao.findByPk(
        req.params.idTransacao
    )
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.post = function(req, res, next) {
    Transacao.create(req.body)
        .then(
            data => res.status(201).json(
                data
            )
        )
        .catch(
            error => {
                res.status(500).json(
                    error.message
                )   
            }
        )
}
exports.put = function(req, res, next) {
    Transacao.upsert(req.body)
        .then(
            data => res.status(200).json(
                data
            )
        )
        .catch(
            error => res.status(500).json(
                {
                    "error": error.message
                }
            )
        )
}

exports.putById = function(req, res, next) {

    req.body["idTransacao"] = req.params.idTransacao;

    Transacao.upsert(dados)
        .then(
            data => res.status(200).json(
                data
            )
        )
        .catch(
            error => res.status(500).json(
                {
                    "error": error.message
                }
            )
        )
}

exports.delete = function(req, res, next) {
    Transacao.destroy({
        where: {
            "idTransacao": req.params.idTransacao
        }
    })
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.findByUser = function(req, res, next) {
    Transacao.findAll(
        {
            where: {
                "idUsuario": req.params.idUsuario
            },
            include: [ Produto ]
        }
    )
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.findByProduct = function(req, res, next) {
    res.json();
}
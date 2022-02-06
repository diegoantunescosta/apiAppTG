const { Comentario, Post } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Comentario.findAll({
        order: [ ['comentario', 'ASC'] ]
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
    Comentario.findByPk(
        req.params.idComentario
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
    Comentario.create(req.body)
        .then(
            data => res.status(201).json(
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

exports.put = function(req, res, next) {
    Comentario.upsert(req.body)
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

    req.body["idComentario"] = req.params.idComentario;

    Comentario.upsert(req.body)
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
    Comentario.destroy({
        where: {
            "idComentario": req.params.idComentario
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

exports.findByPost = function(req, res, next) {
    Comentario.findAll({
        where: {
            "idPost": req.params.idPost
        }
    })
    .then(
        data => res.status(200).json(
            {
                data
            }
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}
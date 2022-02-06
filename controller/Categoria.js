const { Categoria } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Categoria.findAll({
        order: [ ['categoria', 'ASC'] ]
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
    Categoria.findByPk(
        req.params.idCategoria
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
    Categoria.create(req.body)
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
    Categoria.upsert(req.body)
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

    req.body["idCategoria"] = req.params.idCategoria;

    Categoria.upsert(req.body)
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
    Categoria.destroy({
        where: {
            "idCategoria": req.params.idCategoria
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
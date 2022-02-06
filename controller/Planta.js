const { Planta } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Planta.findAll({
        order: [ ['nome', 'ASC'] ]
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
    Planta.findByPk(
        req.params.idPlanta
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
    Planta.create(req.body)
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
    Planta.upsert(req.body)
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
    req.body["idPlanta"] = req.params.idPlanta;

    Planta.upsert(dados)
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
    Planta.destroy({
        where: {
            "idPlanta": req.params.idPlanta
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

exports.updateImage = function(req, res, next) {
    Planta.update(
        {
            imagePath: '/' + req.file.path.replace("\\", "/")
        },
        {
            where: {
                idPlanta: req.params.idPlanta
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
            next(error);
        }
    )
}
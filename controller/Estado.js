const { Estado, Pais } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {

    Estado.findAll({
        order: [[ 'estado', 'ASC' ]]
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
    Estado.findByPk(
        req.params.idEstado
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

    Estado.create(req.body)
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
    Estado.upsert(req.body)
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

    req.body["idEstado"] = req.params.idEstado;

    Estado.upsert(req.body)
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
    Estado.destroy({
        where: {
            "idEstado": req.params.idEstado
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

exports.findByCountry = function(req, res, next) {

    Estado.findAll({
        where: {
            "idPais": req.params.idPais
        },
        order: [[ 'estado', 'ASC' ]],
        include: Pais
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
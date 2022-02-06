const { Conquista, Conquistas_Usuarios } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Conquista.findAll({
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
    Conquista.findByPk(
        req.params.idConquista
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
    Conquista.create(req.body)
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
    Conquista.upsert(req.body)
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

    req.body["idConquista"] = req.params.idConquista;

    Conquista.upsert(req.body)
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
    Conquista.destroy({
        where: {
            "idConquista": req.params.idConquista
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

exports.getByUser = function(req, res, next) {
    Conquistas_Usuarios.findAll(
        {
            where: {
                "idUsuario": req.params.idUsuario
            },
            include: Conquista
        }
    )
    .then(
        data => res.status(200).json(
            data
        )
    )
    .catch(
        error => {
            res.status(500).json(
                {
                    "error": error.message
                }
            );
        }
    )
}

exports.postByUser = function(req, res, next) {
    Conquistas_Usuarios.upsert(req.params)
    .then(
        data => res.status(201).json(
            data
        )
    )
    .catch(
        error => {
            next(error);
        }
    )
}

exports.deleteByUser = function(req, res, next) {
    Conquistas_Usuarios.destroy(
        {
            where: {
                "idUsuario": req.params.idUsuario,
                "idConquista": req.params.idConquista
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

exports.updateIcon = function(req, res, next) {
    Conquista.update(
        {
            icon: '/' + req.file.path.replace("\\", "/")
        },
        {
            where: {
                idConquista: req.params.idConquista
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
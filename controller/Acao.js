const { Acao } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Acao.findAll({
        order: [ ['atividade', 'ASC'] ]
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
    Acao.findByPk(
        req.params.idAcao
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
    Acao.create(req.body)
        .then(
            data => res.status(201).json(
                data
            )
        )
        .catch(
            error => res.status(500).json(
                error
            )
        )
}

exports.put = function(req, res, next) {
    Acao.upsert(req.body)
        .then(
            data => res.status(200).json(
                data
            )
        )
        .catch(
            error => res.status(500).json(
                error
            )
        )
}

exports.putById = function(req, res, next) {

    req.body['idAcao'] = req.params.idAcao;

    Acao.upsert(req.body)
        .then(
            data => res.status(200).json(
                data
            )
        )
        .catch(
            error => res.status(500).json(
                error
            )
        )
}

exports.delete = function(req, res, next) {
    Acao.destroy({
        where: {
            "idAcao": req.params.idAcao
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
    
    Acao.update(
        {
            imagePath: '/' + req.file.path.replace("\\", "/")
        },
        {
            where: {
                idAcao: req.params.idAcao
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
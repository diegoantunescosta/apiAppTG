const { Avaliacao } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Avaliacao.findAll({
        order: [[ 'createdAt', 'ASC' ]]
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
     Avaliacao.findByPk(
        req.params.idAvaliacao
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
    Avaliacao.create(req.body)
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
    Avaliacao.upsert(req.body)
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

    req.body["idAvaliacao"] = req.params.idAvaliacao;

    Avaliacao.upsert(req.body)
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
    Avaliacao.destroy({
        where: {
            "idAvaliacao": req.params.idAvaliacao
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

exports.findByProduct = function(req, res, next) {
    Avaliacao.findAll(
        {
            where: {
                "idProduto": req.params.idProduto
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
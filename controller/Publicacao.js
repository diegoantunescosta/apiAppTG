const { Post } = require('../utils/sequelize');

exports.getAll = function(req, res, next) {
    Post.findAll({
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
    Post.findByPk(
        req.params.idPost
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
    Post.create(req.body)
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
    Post.upsert(req.body)
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

    req.body["idPost"] = req.params.idPost;

    Post.upsert(dados)
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
    Post.destroy({
        where: {
            "idPost": req.params.idPost
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
    
    Post.update(
        {
            imagePath: '/' + req.file.path.replace("\\", "/")
        },
        {
            where: {
                idPost: req.params.idPost
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
            res.status(500).json(
                {
                    "error": error.message
                }
            )
        }
    )

}
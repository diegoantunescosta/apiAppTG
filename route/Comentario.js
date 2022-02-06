const router = require("express").Router();
const ComentarioController = require('../controller/Comentario');

router.route("/")
    .get(ComentarioController.getAll)
    .post(ComentarioController.post)
    .put(ComentarioController.put);

router.route("/:idComentario")
    .get(ComentarioController.getById)
    .put(ComentarioController.putById)
    .delete(ComentarioController.delete)

router.route("/findbypost/:idPost")
    .get(ComentarioController.findByPost);

module.exports = router;
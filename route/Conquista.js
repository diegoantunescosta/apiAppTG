const router = require("express").Router();
const ConquistaController = require('../controller/Conquista');

let { uploadMulter } = require('../index');

router.route("/")
    .get(ConquistaController.getAll)
    .post(ConquistaController.post)
    .put(ConquistaController.put);

router.route("/:idConquista")
    .get(ConquistaController.getById)
    .put(ConquistaController.putById)
    .delete(ConquistaController.delete)

router.route("/:idConquista/uploadimage")
    .post(uploadMulter.single("file"), ConquistaController.updateIcon)

router.route("/:idConquista/addtouser/:idUsuario")
    .post(ConquistaController.postByUser);

router.route("/:idConquista/rmtouser/:idUsuario")
    .delete(ConquistaController.deleteByUser);

router.route("/findbyuser/:idUsuario")
    .get(ConquistaController.getByUser);

module.exports = router;
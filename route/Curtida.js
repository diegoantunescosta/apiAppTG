const router = require("express").Router();
const CurtidaController = require('../controller/Curtida');

router.route("/")
    .get(CurtidaController.getAll)
    .post(CurtidaController.post)
    .put(CurtidaController.put);

router.route("/:idCurtida")
    .get(CurtidaController.getById)
    .put(CurtidaController.putById)
    .delete(CurtidaController.delete)

router.route("/findbypost/:idPost")
    .get(CurtidaController.findByPost);

module.exports = router;
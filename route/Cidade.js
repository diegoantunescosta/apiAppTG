const router = require("express").Router();
const CidadeController = require('../controller/Cidade');

router.route("/")
    .get(CidadeController.getAll)
    .post(CidadeController.post)
    .put(CidadeController.put);

router.route("/:idCidade")
    .get(CidadeController.getById)
    .put(CidadeController.putById)
    .delete(CidadeController.delete)

router.route("/findbystate/:idEstado")
    .get(CidadeController.findByState);

module.exports = router;
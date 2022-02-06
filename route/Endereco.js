const router = require("express").Router();
const EnderecoController = require('../controller/Endereco');

router.route("/")
    .get(EnderecoController.getAll)
    .post(EnderecoController.post)
    .put(EnderecoController.put);

router.route("/:idEndereco")
    .get(EnderecoController.getById)
    .put(EnderecoController.putById)
    .delete(EnderecoController.delete)

router.route("/findbyuser/:idUsuario")
    .get(EnderecoController.findByUser);

module.exports = router;
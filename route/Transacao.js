const router = require("express").Router();
const TransacaoController = require('../controller/Transacao');

router.route("/")
    .get(TransacaoController.getAll)
    .post(TransacaoController.post)
    .put(TransacaoController.put);

router.route("/:idTransacao")
    .get(TransacaoController.getById) 
    .put(TransacaoController.putById)
    .delete(TransacaoController.delete)

router.route("/findbyuser/:idUsuario")
    .get(TransacaoController.findByUser);

module.exports = router;
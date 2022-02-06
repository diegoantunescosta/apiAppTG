const router = require("express").Router();
const AvaliacaoController = require('../controller/Avaliacao');

const validator = require('../utils/validador');

router.route("/")
    .get(AvaliacaoController.getAll)
    .post(validator.validate, AvaliacaoController.post)
    .put(validator.validate, AvaliacaoController.put);

router.route("/:idAvaliacao")
    .get(AvaliacaoController.getById)
    .put(validator.validate, AvaliacaoController.putById)
    .delete(validator.validate, AvaliacaoController.delete);

router.route("/findbyproduct/:idProduto")
    .get(validator.validate, AvaliacaoController.findByProduct);

module.exports = router;
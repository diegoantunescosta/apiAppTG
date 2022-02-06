const router = require("express").Router();
const PaisController = require('../controller/Pais');

router.route("/")
    .get(PaisController.getAll)
    .post(PaisController.post)
    .put(PaisController.put);

router.route("/:idPais")
    .get(PaisController.getById)
    .put(PaisController.putById)
    .delete(PaisController.delete);

module.exports = router;
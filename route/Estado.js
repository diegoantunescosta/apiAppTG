const router = require("express").Router();
const EstadoController = require('../controller/Estado');

router.route("/")
    .get(EstadoController.getAll)
    .post(EstadoController.post)
    .put(EstadoController.put);

router.route("/:idEstado")
    .get(EstadoController.getById)
    .put(EstadoController.putById)
    .delete(EstadoController.delete)

router.route("/findbycountry/:idPais")
    .get(EstadoController.findByCountry);

module.exports = router;
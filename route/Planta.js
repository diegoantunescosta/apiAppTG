const router = require("express").Router();
const PlantaController = require('../controller/Planta');

let { uploadMulter } = require('../index');

router.route("/")
    .get(PlantaController.getAll)
    .post(PlantaController.post)
    .put(PlantaController.put);

router.route("/:idPlanta")
    .get(PlantaController.getById)
    .put(PlantaController.putById)
    .delete(PlantaController.delete)

router.route("/:idPlanta/uploadimage")
    .post(uploadMulter.single("file"), PlantaController.updateImage);

module.exports = router;
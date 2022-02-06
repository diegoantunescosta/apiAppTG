const router = require("express").Router();
const AcaoController = require('../controller/Acao');

let { uploadMulter } = require('../index');

router.route("/")
    .get(AcaoController.getAll)
    .post(AcaoController.post)
    .put(AcaoController.put);

router.route("/:idAcao")
    .get(AcaoController.getById)
    .put(AcaoController.putById)
    .delete(AcaoController.delete);

router.route("/:idAcao/updateimage")
    .post(uploadMulter.single("file"), AcaoController.updateImage);

module.exports = router;
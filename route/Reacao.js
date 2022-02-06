const router = require("express").Router();
const ReacaoController = require('../controller/Reacao');

let { uploadMulter } = require('../index');

router.route("/")
    .get(ReacaoController.getAll)
    .post(ReacaoController.post)
    .put(ReacaoController.put);

router.route("/:idReacao")
    .get(ReacaoController.getById)
    .put(ReacaoController.putById)
    .delete(ReacaoController.delete);

router.route("/:idReacao/uploadimage")
    .post(uploadMulter.single("file"), ReacaoController.updateIcon);

module.exports = router;
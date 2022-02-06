const router = require("express").Router();
const PublicacaoController = require('../controller/Publicacao');

let { uploadMulter } = require('../index');

router.route("/")
    .get(PublicacaoController.getAll)
    .post(PublicacaoController.post)
    .put(PublicacaoController.put);

router.route("/:idPost")
    .get(PublicacaoController.getById)
    .put(PublicacaoController.putById)
    .delete(PublicacaoController.delete)

router.route("/:idPost/uploadimage")
    .post(uploadMulter.single("file"), PublicacaoController.updateImage);

module.exports = router;
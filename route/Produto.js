const router = require("express").Router();
const ProdutoController = require('../controller/Produto');

let { uploadMulter } = require('../index');

router.route("/")
    .get(ProdutoController.getAll)
    .post(ProdutoController.post)
    .put(ProdutoController.put);

router.route("/:idProduto")
    .get(ProdutoController.getById)
    .put(ProdutoController.putById)
    .delete(ProdutoController.delete)

router.route("/:idProduto/uploadimage")
    .post(uploadMulter.single("file"), ProdutoController.updateImage);

module.exports = router;
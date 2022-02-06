const router = require("express").Router();
const CategoriaController = require('../controller/Categoria');

router.route("/")
    .get(CategoriaController.getAll)
    .post(CategoriaController.post)
    .put(CategoriaController.put);

router.route("/:idCategoria")
    .get(CategoriaController.getById)
    .put(CategoriaController.putById)
    .delete(CategoriaController.delete)

module.exports = router;
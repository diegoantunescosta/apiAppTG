const router = require("express").Router();
const UsuarioController = require('../controller/Usuario');

const validator = require('../utils/validador');

let { uploadMulter } = require('../index');

router.route("/")
    .get(UsuarioController.getAll)
    .post(UsuarioController.post)
    .put(UsuarioController.put);

router.route("/login")
    .post(UsuarioController.login);
 
router.route("/logout")
    .get(UsuarioController.logout);

router.route("/createwitharray")
    .post(UsuarioController.postArray);

router.route("/redefinepwd")
    .post(validator.validate, UsuarioController.redefinePWD);

router.route("/:idUsuario")
    .get(UsuarioController.getById)
    .put(UsuarioController.putById)
    .delete(UsuarioController.delete);

router.route("/:idUsuario/uploadimage")
    .post(validator.validate, uploadMulter.single("file"), UsuarioController.updateImage);

module.exports = router;
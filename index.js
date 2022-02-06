const express = require("express");
const cors = require("cors");

const serveStatic = require('serve-static');
const path = require('path');
const fs = require('fs');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

let multer  = require('multer')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './photos')
  },
  filename: function (req, file, cb) {
    let typeFile = file.mimetype.split('/')[1];
    cb(null, file.fieldname + '-' + Date.now() + '.' + typeFile)
  }
})

let uploadMulter = multer({ storage: storage });

module.exports = {uploadMulter};

const AcaoRouter = require('./route/Acao');
const AvaliacaoRouter = require('./route/Avaliacao');
const CategoriaRouter = require('./route/Categoria');
const CidadeRouter = require('./route/Cidade');
const ComentarioRouter = require('./route/Comentario');
const ConquistaRouter = require('./route/Conquista');
const CurtidaRouter = require('./route/Curtida');
const EnderecoRouter = require('./route/Endereco');
const EstadoRouter = require('./route/Estado');
const PaisRouter = require('./route/Pais');
const PlantaRouter = require('./route/Planta');
const ProdutoRouter = require('./route/Produto');
const PublicacaoRouter = require('./route/Publicacao');
const ReacaoRouter = require('./route/Reacao');
const TransacaoRouter = require('./route/Transacao');
const UsuarioRouter = require('./route/Usuario');

const app = express();

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));

const dir = path.join(__dirname, 'photos');
let diretorios = [
                  __dirname + '/photos/',
                  __dirname + '/photos/users/',
                  __dirname + '/photos/plants/',
                  __dirname + '/photos/posts/',
                  __dirname + '/photos/icon/'
                ];
diretorios.forEach(
  (value) => {
    if (!fs.existsSync(value)) {
      fs.mkdirSync(value);
    }
  }
);

app.use('/photos', serveStatic(dir));
app.use('/action', AcaoRouter);
app.use('/rating', AvaliacaoRouter);
app.use('/category', CategoriaRouter);
app.use('/city', CidadeRouter);
app.use('/comment', ComentarioRouter);
app.use('/achievement', ConquistaRouter);
app.use('/likes', CurtidaRouter);
app.use('/address', EnderecoRouter);
app.use('/state', EstadoRouter);
app.use('/country', PaisRouter);
app.use('/plant', PlantaRouter);
app.use('/product', ProdutoRouter);
app.use('/post', PublicacaoRouter);
app.use('/reaction', ReacaoRouter);
app.use('/transaction', TransacaoRouter);
app.use('/user', UsuarioRouter);

const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
   error: {
    status: error.status || 500,
    message: error.message || "Internal Server Error",
    },
 });
});

let port = process.env.PORT || 3000;

app.listen(port, '0.0.0.0', () => console.log(`Servidor Subiu!\nPara acessar a documentação do Swagger entre em: http://localhost:${port}/`));
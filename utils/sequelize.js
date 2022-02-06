const config = {
    username: 'root',
    password: 'root',
    database: 'locategreen',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    operatorAliases: false,
    logging: false,
    define: {
      timestamps: true,
      underscored: false,
    }
};

const Sequelize = require('sequelize');
const Model = Sequelize.Model;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const PaisModel = require('../model/Pais.js');
const EstadoModel = require('../model/Estado.js');
const CidadeModel = require('../model/Cidade');
const EnderecoModel = require('../model/Endereco');
const UsuarioModel = require('../model/Usuario');
const CategoriaModel = require('../model/Categoria');
const ProdutoModel = require('../model/Produto');
const TransacaoModel = require('../model/Transacao');
const AvaliacaoModel = require('../model/Avaliacao');
const PlantaModel = require('../model/Planta');
const AcaoModel = require('../model/Acao');
const ConquistaModel = require('../model/Conquista');
const Conquistas_UsuariosModel = require('../model/Conquistas_Usuarios');
const PostModel = require('../model/Post');
const ComentarioModel = require('../model/Comentario');
const ReacaoModel = require('../model/Reacao');
const CurtidaModel = require('../model/Curtida');

let hashPassword = (password) => {
  let hash = bcrypt.hashSync(password, 10);
  return hash;
}

const sequelize = new Sequelize(config.database, config.username, config.password, config);

sequelize.authenticate()
    .then(() => {
        console.log("Connected to Database")
    }).catch(err => {
        console.log("Error to connect to the database: " + err)
    });

class Pais extends Model { };
Pais.init(PaisModel(Sequelize), {
  sequelize,
  modelName: "Paises"
});

class Estado extends Model { };
Estado.init(EstadoModel(Sequelize), {
  sequelize,
  modelName: "Estados"
});

class Cidade extends Model {};
Cidade.init(CidadeModel(Sequelize), {
  sequelize,
  modelName: "Cidades"
});

class Endereco extends Model {};
Endereco.init(EnderecoModel(Sequelize), {
  sequelize,
  modelName: "Enderecos"
});

class Usuario extends Model {};
Usuario.init(UsuarioModel(Sequelize), {
  sequelize,
  modelName: "Usuarios"
});

Usuario.beforeCreate(function(user, options) {
  novaSenha = hashPassword(user.senha);
  user.senha = novaSenha;
  return user;
});

Usuario.beforeBulkCreate(function(users, options) {
  for (user of users) {
    newpwd = hashPassword(user.senha);
    user.senha = newpwd;
  }
  return users;
})

Usuario.updatePWD = function(user, cb) {
  try {
    let hashed = hashPassword(user.senha);

    Usuario.update(
      {
        "senha": hashed
      },
      {
        where: {
          "email": user.email
        }
      }
    )
    .then(
      data => cb(null, data)
    )
    .catch(
      error => cb(error, null)
    )
  } catch(error) {
    cb(error, null)
  }
}

Usuario.putByID = function(user, cb) {
  try {
    let hashed = hashPassword(user.senha);
    Usuario.upsert(user)
    .then(
      data => cb(null, data)
    )
    .catch(
      errors => cb(errors, null)
    )
  } catch(error) {
    cb(error, null);
  }
}

Usuario.validatePassword = function(senha, data, callback) {
  
  try {

    let hash = bcrypt.compareSync(senha, data[0].senha);
    callback(null, hash);
  
  } catch (error) {
    
    callback(error, null);
  
  }

}

Usuario.generateToken = function(values, callback) {

  let data = {
    "email": values[0].email,
    "nome": values[0].nome,
    "idUsuario": values[0].idUsuario
  }

  try {

    let token = jwt.sign(
      data,
      "cultivando",
      {
        expiresIn: "7d"
      }
    )

    callback(null, token);

  } catch (error) {
    
    callback(error, null)

  }

}

Usuario.validateToken = function(token, callback) {

  try {
    
    let validate = jwt.verify(token, "cultivando");

    callback(null, validate);

  } catch (error) {
    
    callback(error, null);

  }

}

class Categoria extends Model {};
Categoria.init(CategoriaModel(Sequelize), {
  sequelize,
  modelName: "Categorias"
});

class Produto extends Model {};
Produto.init(ProdutoModel(Sequelize), {
  sequelize,
  modelName: "Produtos"
});

class Transacao extends Model {};
Transacao.init(TransacaoModel(Sequelize), {
  sequelize,
  modelName: "Transacoes"
});

Transacao.addHook("beforeCreate", "productValidate", function(transacao, options) {
  let produto = transacao.get("idProduto");
  let qtd = transacao.get("qtd");

  return new Promise((resolve, reject) => {
    Produto.findByPk(produto)
    .then(
      value => {
        if (value.get("estoque") >= qtd && value.get("estoque") > 0 && qtd > 0) {
          resolve();
        } else {
          reject(new Error("Número superior ao do Estoque"));
        }
      }
    )
    .catch(
      error => {
        reject(error);
      }
    )
  })
});

Transacao.addHook("afterCreate", "productUpdate", function(transacao, options) {

  let produto = transacao.get("idProduto");
  let qtd = transacao.get("qtd");

  return new Promise((resolve, reject) => {
    Produto.findByPk(produto)
    .then(
      value => {
        value.decrement("estoque", { by: qtd })
        .then(
          value => resolve()
        )
        .catch(
          error => reject(error)
        )
      }
    )
    .catch(
      error => reject(error)
    )
  })

})

class Avaliacao extends Model {};
Avaliacao.init(AvaliacaoModel(Sequelize), {
  sequelize,
  modelName: "Avaliacoes"
});

class Planta extends Model {};
Planta.init(PlantaModel(Sequelize), {
  sequelize,
  modelName: "Plantas"
});

class Acao extends Model {};
Acao.init(AcaoModel(Sequelize), {
  sequelize,
  modelName: "Acoes"
});

class Conquista extends Model {};
Conquista.init(ConquistaModel(Sequelize), {
  sequelize,
  modelName: "Conquistas"
});

class Conquistas_Usuarios extends Model {};
Conquistas_Usuarios.init(Conquistas_UsuariosModel(Sequelize), {
  sequelize
});

class Post extends Model {};
Post.init(PostModel(Sequelize), {
  sequelize,
  modelName: "Posts"
});

class Comentario extends Model {};
Comentario.init(ComentarioModel(Sequelize), {
  sequelize,
  modelName: "Comentarios"
});

class Reacao extends Model {};
Reacao.init(ReacaoModel(Sequelize), {
  sequelize,
  modelName: "Reacoes"
});

class Curtida extends Model {};
Curtida.init(CurtidaModel(Sequelize), {
  sequelize,
  modelName: "Curtidas"
})

//  1 X N - Pais - Estado
Pais.hasMany(Estado, {
  foreignKey: "idPais"
});
Estado.belongsTo(Pais, {
  foreignKey: "idPais"
});

//  1 X N - Estado - Cidade
Estado.hasMany(Cidade, {
  foreignKey: "idEstado"
});
Cidade.belongsTo(Estado, {
  foreignKey: "idEstado"
});

//  1 X N - Cidade - Endereços
Cidade.hasMany(Endereco, {
  foreignKey: "idCidade"
});
Endereco.belongsTo(Cidade, {
  foreignKey: "idCidade"
});

//  1 X N - Endereço - Usuários

Endereco.hasMany(Usuario, {
  foreignKey: "idEndereco"
});
Usuario.belongsTo(Endereco, {
  foreignKey: "idEndereco"
});

//  1 X N - Categoria - Produto
Categoria.hasMany(Produto, {
  foreignKey: "idCategoria"
});
Produto.belongsTo(Categoria, {
  foreignKey: "idCategoria"
});

// 1 X N - Usuário - Produto 
Usuario.hasMany(Produto, {
  foreignKey: "idUsuario"
});
Produto.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

//  1 X N - Usuario - Transacao
//  1 X N - Produto - Transacao
Usuario.hasMany(Transacao, {
  foreignKey: "idUsuario"
});
Transacao.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Produto.hasMany(Transacao, {
  foreignKey: "idProduto"
});
Transacao.belongsTo(Produto, {
  foreignKey: "idProduto"
});

//  1 X N - Usuario - Avaliacao
//  1 X N - Produto - Avaliacao
Usuario.hasMany(Avaliacao, {
  foreignKey: "idUsuario"
});
Avaliacao.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Produto.hasMany(Avaliacao, {
  foreignKey: "idProduto"
});
Avaliacao.belongsTo(Produto, {
  foreignKey: "idProduto"
});

//  1 X N - Usuario - Planta
//  1 X N - Categoria - Planta
Usuario.hasMany(Planta, {
  foreignKey: "idUsuario"
});
Planta.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Categoria.hasMany(Planta, {
  foreignKey: "idCategoria"
});
Planta.belongsTo(Categoria, {
  foreignKey: "idCategoria"
});

//  1 X N - Usuario - Acao
//  1 X N - Planta - Acao
Usuario.hasMany(Acao, {
  foreignKey: "idUsuario"
});
Acao.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Planta.hasMany(Acao, {
  foreignKey: "idPlanta"
});
Acao.belongsTo(Planta, {
  foreignKey: "idPlanta"
});

//  1 X N - Usuario - Conquistas_Usuarios
//  1 X N - Conquista - Conquistas_Usuarios
Usuario.hasMany(Conquistas_Usuarios, {
  foreignKey: "idUsuario"
});
Conquistas_Usuarios.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Conquista.hasMany(Conquistas_Usuarios, {
  foreignKey: "idConquista"
});
Conquistas_Usuarios.belongsTo(Conquista, {
  foreignKey: "idConquista"
});

//  1 X N - Usuario - Post
Usuario.hasMany(Post, {
  foreignKey: "idUsuario"
});
Post.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

//  1 X N - Usuario - Comentario
//  1 X N - Post - Comentario
Usuario.hasMany(Comentario, {
  foreignKey: "idUsuario"
});
Comentario.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Post.hasMany(Comentario, {
  foreignKey: "idPost"
});
Comentario.belongsTo(Post, {
  foreignKey: "idPost"
});

//  1 X N - Usuario - Curtida
//  1 X N - Reacao - Curtida
//  1 X N - Post - Curtida
Usuario.hasMany(Curtida, {
  foreignKey: "idUsuario"
});
Curtida.belongsTo(Usuario, {
  foreignKey: "idUsuario"
});

Reacao.hasMany(Curtida, {
  foreignKey: "idReacao"
});
Curtida.belongsTo(Reacao, {
  foreignKey: "idReacao"
});

Post.hasMany(Curtida, {
  foreignKey: "idPost"
});
Curtida.belongsTo(Post, {
  foreignKey: "idPost"
});

sequelize.sync()
    .then(() => {
      console.log("Synchronized to Database")
    }).catch(err => {
      console.log("Error to sync the database: " + err)
    });

module.exports = {
  Pais,
  Estado,
  Cidade,
  Endereco,
  Usuario,
  Categoria,
  Produto,
  Transacao,
  Avaliacao,
  Planta,
  Acao,
  Conquista,
  Conquistas_Usuarios,
  Post,
  Comentario,
  Reacao,
  Curtida,
  sequelize,
  hashPassword
};
  
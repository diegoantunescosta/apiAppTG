module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idProduto"
        },
        nome: {
            type: Types.STRING,
            allowNull: false
        },
        preco: {
            type: Types.DOUBLE,
            allowNull: false
        },
        imagePath: {
            type: Types.STRING,
            allowNull: true
        },
        legenda: {
            type: Types.STRING,
            allowNull: true
        },
        estoque: {
            type: Types.INTEGER,
            allowNull: false
        },
        doacao: {
            type: Types.BOOLEAN,
            allowNull: false
        }
    }
}

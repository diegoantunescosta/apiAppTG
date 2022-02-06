module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idEndereco"
        },
        rua: {
            type: Types.STRING,
            allowNull: false
        },
        numero: {
            type: Types.STRING,
            allowNull: false
        },
        bairro: {
            type: Types.STRING,
            allowNull: false
        }
    }
}

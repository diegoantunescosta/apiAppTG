module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idTransacao"
        },
        qtd: {
            type: Types.INTEGER,
            allowNull: false
        }
    }
}

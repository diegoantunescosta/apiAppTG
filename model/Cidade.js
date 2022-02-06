module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idCidade"
        },
        cidade: {
            type: Types.STRING,
            allowNull: false
        },
    }
}

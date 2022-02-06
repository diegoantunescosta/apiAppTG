module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idReacao"
        },
        reacao: {
            type: Types.STRING,
            allowNull: false
        },
        icon: {
            type: Types.STRING,
            allowNull: true
        }
    }
}

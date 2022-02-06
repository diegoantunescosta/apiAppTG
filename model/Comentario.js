module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idComentario"
        },
        comentario: {
            type: Types.STRING,
            allowNull: false
        }
    }
}

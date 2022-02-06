module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idAvaliacao"
        },
        avaliacao: {
            type: Types.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
                max: 5
            }
        },
        comentario: {
            type: Types.STRING,
            allowNull: true
        }
    }
}

module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idPost"
        },
        legenda: {
            type: Types.STRING,
            allowNull: false
        },
        imagePath: {
            type: Types.STRING,
            allowNull: true
        }
    }
}

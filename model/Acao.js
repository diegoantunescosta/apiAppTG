module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idAcao"
        },
        atividade: {
            type: Types.STRING,
            allowNull: true
        },
        imagePath: {
            type: Types.STRING,
            allowNull: true
        }
    }
}

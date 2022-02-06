module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idPlanta"
        },
        nome: {
            type: Types.STRING,
            allowNull: false
        },
        legenda: {
            type: Types.STRING,
            allowNull: true
        },
        cuidados: {
            type: Types.STRING,
            allowNull: true
        },
        imagePath: {
            type: Types.STRING,
            allowNull: true
        },
        lat: {
            type: Types.FLOAT,
            allowNull: false
        },
        long: {
            type: Types.FLOAT,
            allowNull: false
        }
    }
}

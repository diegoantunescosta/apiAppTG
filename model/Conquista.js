module.exports = (Types) => {
    return {
        id: {
            allowNull: false,
            type: Types.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
            field: "idConquista"
        },
        nome: {
            type: Types.STRING,
            allowNull: false
        },
        icon: {
            type: Types.STRING,
            allowNull: true
        },
        pontos: {
            type: Types.INTEGER,
            allowNull: false
        },
        numAjudas: {
            type: Types.INTEGER,
            allowNull: true
        },
        numPlantas: {
            type: Types.INTEGER,
            allowNull: true
        },
        numDoacoes: {
            type: Types.INTEGER,
            allowNull: true
        },
        numVendas: {
            type: Types.INTEGER,
            allowNull: true
        },
    }
}

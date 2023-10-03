
module.exports = function (sequelize, Sequelize) {
    const Pays = sequelize.define("pays",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
                
            },
            nomPays: {
                type: Sequelize.STRING,
            },
            codeIso2: {
                type: Sequelize.STRING,
            },
            codeIso3: {
                type: Sequelize.STRING,
            }
        }, { timestamps: true });
    return Pays;
};
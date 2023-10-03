
module.exports = function (sequelize, Sequelize) {
    const Role = sequelize.define("roles",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
                
            },
            nom: {
                type: Sequelize.STRING,
            }
        }, { timestamps: true });
    return Role;
};
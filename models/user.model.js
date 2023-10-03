
module.exports = function (sequelize, Sequelize) {
    const User = sequelize.define("users",
        {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
                
            },
            username: {
                type: Sequelize.STRING,
            },
            password: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING,
            }
        }, { timestamps: true });
    return User;
};
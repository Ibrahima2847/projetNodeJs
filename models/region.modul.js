
module.exports = function (sequelize, Sequelize) {
    const Region = sequelize.define("regions",
        {
            id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            nom: {
                type: Sequelize.STRING,
            },
            nombreHabitants: {
                type: Sequelize.INTEGER,
            }
        },{timestamps:true});
    return Region;
};
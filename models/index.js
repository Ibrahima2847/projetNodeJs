const { Sequelize } = require('sequelize');
require('dotenv').config();
const sequelize = new Sequelize
    (
        process.env.DATABASE,
        process.env.USER,
        process.env.PASSWORD,
        {
            host: process.env.HOST,
            port: process.env.PORT,
            dialect: 'mysql',     //postrgresql autre base de donnees
        }
    );


//definir la base
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.Pays = require('./pays.models')(sequelize, Sequelize);
db.Region = require('./region.modul')(sequelize, Sequelize);

db.User = require('./user.model')(sequelize, Sequelize);
db.Role = require('./role.model')(sequelize,Sequelize);


//OneToMAny
db.Pays.hasMany(db.Region, { foreignKey: 'paysID', as: 'regions', onDelete: 'cascade' });
db.Region.belongsTo(db.Pays, { foreignKey: 'paysID', as: 'pays' });

//ManyToMany
db.User.belongsToMany(db.Role, {through: 'users_roles', foreignKey: 'role_id'});
db.Role.belongsToMany(db.User, {through: 'users_roles', foreignKey: 'user_id'});


module.exports = db;
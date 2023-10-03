const { genereateToken } = require('../middleware/jwtAuth');
const db = require('../models');
const User = db.User;
const Op = db.Sequelize.Op;
const Bcrypt = require('bcryptjs');
const auth = require('../middleware/jwtAuth')

exports.creerUser = function (req, res){
    const userWithCryptedPassword = {username: req.body.username, email: req.body.emal, password: Bcrypt.hashSync(req.body.password)}
    User.create(userWithCryptedPassword)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json({ 'error': 'Erreur when we creating User' });
        })
    }
exports.getAllUsers = async function(req, res){
    try {
        res.json(await User.findAll())
    } catch (error) {
        res.status(500).json({ 'error': ' Erreur when retrieving all User' });     
    }
}

exports.deleteUser = function(req, res){
    User.destroy({where: {id:req.params.id}})
    .then((data) =>{
        res.json({ 'message': 'User supprimé avec succes' });
    }).catch((err) =>{
        res.status(500).json({ 'error': 'Erreur lors de la suppression du  User' });
    }) 
}

exports.updateUser = async function(req, res) {
    try {
        const id = req.params.id;
        const existingUser = await User.findByPK(id);
        if(existingUser) {
            res.json({ "message": "Updating successfully!" });

        }
    } catch (error) {
        res.status(500).json({ "message": "Erreur lors de la modification" });
        
    }
}

exports.getUserById = function (req, res) {

        User.findByPk(req.params.id)
        .then((data) => {
            res.json(data);
        }).catch ((error) => {
        res.status(500).json({ 'error': 'Erreur when we  getting  User' });
        
    });
}

exports.createdUserWithRole = async function (req, res) {
    try {
        const user = await User.create({
            username: req.body.username,
            password: Bcrypt.hashSync(req.body.password),
            email: req.body.email,
        });

        const role = await db.Role.findAll({where: {nom: { [Op.or]: req.body.role }}});
        user.setRoles(role);
        res.json({"message":"User created succefully"});
    } catch (error) {
        res.json({"message":"Error creating user"});
    }
}

exports.SignIn = function (req, res) {
    User.findOne({where: {username: req.body.username}}, {include:
    [
        {
            model: db.Role, 
            as: 'roles',
        }
    ]})
    .then(user => {
            if(Bcrypt.compareSync(req.body.password, user.password)) {
                const payload = {
                    userId: user.id,
                    username: user.username,
                    roles: user.roles,
                };

                const options = {
                    expiresIn: '1h' //Le token va expirer au bout de 1h 
                };
                const token = auth.genereateToken(payload, process.env.SECRET_KEY, options);
                res.json({'token': token})
            }
        }).catch(err => {
            res.status(401).json({ "message": "Unauthorized user" });
        });
    }
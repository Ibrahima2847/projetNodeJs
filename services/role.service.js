const db = require('../models');
const Role = db.Role;

exports.creerRole = function (req, res){
    Role.create(req.body)
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ 'error': 'Erreur when we creating Role' });
    })
}
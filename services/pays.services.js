const db = require("../models");
//recuperer qu'on a defini au niveau de la base de donnees
const Pays = db.Pays;

function creerPays(req, res) {
    Pays.create(req.body)
        .then((data) => {
            res.json(data);
            // res.json('Pays');
        }).catch((err) => {
            console.log(err);
            res.status(500).json({ 'error': 'Erreur when we creating Pays' });
        });
};
//recuperation d'un pays
function getPaysById(req, res) {
    Pays.findByPk(req.params.id)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json({ 'error': 'Erreur when we  getting  Pays' });
        });
};

//liste des pays

const getAllPays = async (req, res) => {
    try {
        res.json(await Pays.findAll());
    } catch (error) {
        res.status(500).json({ 'error': ' Erreur when retrieving all Pays' });
    }
};

//la suppression

const deletePays = function (req, res) {
    Pays.destroy({ where: { id: req.params.id } })
        .then((data) => {
            res.json({ 'message': 'Pays supprimé avec succes' });
        }).catch((err) => {
            res.status(500).json({ 'error': 'Erreur lors de la suppression du  Pays' });
        });

};

//la modification 

async function updatePays(req, res) {
    try {
        const id = req.params.id;
        const existingPays = await Pays.findByPk(id);
        if (existingPays) {
            existingPays.update(req.body);
            res.json({ "message": "Updating successfully!" });
        }
    } catch {
        res.status(500).json({ "message": "Erreur lors de la modification" });
    }
}

async function getRegionByPaysId(req,res){
    try{
        const paysTrouver = await Pays.findByPk(req.params.id,{include: [
            {
                model:db.Region,
            as:'regions',
    }
    ]})
        res.json(paysTrouver);
    }catch(error){
        res.status(500).json("erreur  lors de la modification");
    }
}
module.exports = {
    creerPays,
    getAllPays,
    getPaysById,
    deletePays,
    updatePays,
    getRegionByPaysId
}
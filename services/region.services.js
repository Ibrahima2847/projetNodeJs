const db = require('../models');
const express = require('express');
const Region = db.Region;
const Pays = db.Pays;
exports.creerRegion = function (req, res) {
    const paysID = req.params.id;
    Region.create({paysID, ...req.body})
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json({ "error": "Error when creating Region" })
        });
}


exports.getAllRegion = async (req, res) => {
    try {
        res.json(await Region.findAll());
    } catch (error) {
        res.status(500).json({ 'error': ' Erreur lors de la  creation de la  region' });
    }
};

exports.getRegionById = function (req, res) {
    Region.findByPk(req.params.idRegion)
        .then((data) => {
            res.json(data);
        }).catch((err) => {
            res.status(500).json({ 'error': 'Erreur lors dela crecuperation avec ID ' });
        });
};

exports.deleteRegion = async function (req, res) {
    try {
        Region.destroy({ where: { id: req.params.idRegion } });
    } catch (err) {
        res.status(500).json({ 'error': 'Erreur lors de la suppression du  Region' });
    }

};

exports.updateRegion = async (req, res) => {
    try {
        const id = req.params.id;
        const existingRegion = await Region.findByPk(id);
        if (existingRegion) {
            existingRegion.update(req.body);
            res.json({ "message": "Updating de la region  successfully!" });
        }
    } catch {
        res.status(500).json({ "message": "Erreur lors de la modification poutr la region " });
    }
}
const { creerPays, deletePays, getAllPays, getPaysById, updatePays, getRegionByPaysId } = require("../services/pays.services");

const express = require("express");
const routes = express.Router();



routes.post('/create', creerPays);
routes.get('/all', getAllPays);
routes.get('/:id', getPaysById);
routes.delete('/delete/:id', deletePays);
routes.put('/:id',updatePays);
routes.get('/:id/regions', getRegionByPaysId);


module.exports = routes; 
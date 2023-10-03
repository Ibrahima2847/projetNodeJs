
const { creerRegion, getAllRegion, getRegionById, deleteRegion, updateRegion } = require("../services/region.services");

const express = require("express");
const routes = express.Router();

routes.post('/create/:id', creerRegion);
routes.get('/all', getAllRegion);
routes.get('/:id', getRegionById);
routes.delete('/:id', deleteRegion);
routes.put('/:id',updateRegion);
module.exports = routes; 
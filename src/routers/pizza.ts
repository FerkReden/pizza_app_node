import express from 'express';
const pizzaService = require('../services/pizza-service');

const router = express.Router();

router.get('/pizza_menu', pizzaService.getMenu);

module.exports = router
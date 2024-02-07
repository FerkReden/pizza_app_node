import express from 'express';
const userService = require('../services/user-service.js')

const router = express.Router();

router.post('/users', userService.createUser);
router.post('/users/login', userService.logIn);
router.get('/users', userService.readUsers);

module.exports = router
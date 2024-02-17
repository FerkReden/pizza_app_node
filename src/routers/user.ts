import express from 'express';
const userService = require('../services/user-service.js')

const router = express.Router();

router.get('/users', userService.readUsers);
router.post('/users', userService.createUser);
router.post('/users/login', userService.logIn);
router.delete('/users/:id', userService.deleteUserById);

module.exports = router
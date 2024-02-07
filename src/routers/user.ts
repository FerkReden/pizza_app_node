import express from 'express';
const userService = require('../services/user-service.js')

const router = express.Router();

router.post('/users', userService.createUser);
router.post('/users/login', userService.logIn);
router.get('/users', userService.readUsers);
<<<<<<< HEAD
=======

module.exports = router
>>>>>>> 1e648701d9a1b80c8a4852c116625a9ae7dd7293

module.exports = router
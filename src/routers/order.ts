import express from 'express';
import auth from '../middleware/auth';
const orderService = require('../services/order-service.js')

const router = express.Router();

router.get('/orders', orderService.readOrders);
router.get('/orders/:userId', orderService.readOrdersByUserId);
router.get('/orders/date/:date', orderService.readOrdersByDate);
router.post('/orders', auth, orderService.createOrder);
router.delete('/orders/:orderId', auth, orderService.deleteOrderById);

module.exports = router
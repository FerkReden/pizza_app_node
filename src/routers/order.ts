import express from 'express';
import auth from '../middleware/auth';
const orderService = require('../services/order-service.js')

const router = express.Router();

router.get('/orders', orderService.readOrders);
router.get('/orders/:userId', auth, orderService.readOrdersByUserId);
router.get('/orders/date/:date', orderService.readOrdersByDate);
router.post('/orders/:userId', auth, orderService.createOrder);
router.delete('/orders/:userId/:orderId', auth, orderService.deleteOrderById);

module.exports = router
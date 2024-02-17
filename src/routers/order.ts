import express from 'express';
const orderService = require('../services/order-service.js')

const router = express.Router();

router.get('/orders', orderService.readOrders);
router.get('/orders/:userId', orderService.readOrdersByUserId);
router.get('/orders/date/:date', orderService.readOrdersByDate);
router.post('/orders', orderService.createOrder);
router.delete('/orders/:orderId', orderService.deleteOrderById);

module.exports = router
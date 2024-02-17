import express from 'express';
const pizzaRouter = require('./routers/pizza');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pizzaRouter);
app.use(userRouter);
app.use(orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});

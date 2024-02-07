import express from 'express';
const pizzaRouter = require('./routers/pizza');
const userRouter = require('./routers/user');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(pizzaRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
<<<<<<< HEAD
});
=======
});


>>>>>>> 1e648701d9a1b80c8a4852c116625a9ae7dd7293

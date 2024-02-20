import { Response, Request } from "express";
import db from '../db/mysql';
import { Order } from '../models/order';

class OrderService{
    createOrder = async (req: Request, res: Response) => {
        try {
            const order = new Order(
                req.body.userId,
                req.body.products,
                req.body.totalAmount,
                req.body.date,
            );

            const sql = "INSERT INTO orders (userId, products, totalAmount, date) VALUES (?, ?, ?, ?)";
            const values = [order.userId, JSON.stringify(order.products), order.totalAmount, order.date];

            const data = await new Promise<any>((resolve, rejects) => {
                db.query(sql, values, (err, result: any) => {
                    if (err) {
                        rejects("Error");
                    } else {
                        resolve(result);
                    }
                });
            });
            

             return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" })
        }
    };

    readOrdersByUserId = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId; 

            const sql = "SELECT * FROM orders WHERE userId = ?";
            const values = [userId];

            const data = await new Promise<any>((resolve, rejects) => {
                db.query(sql, values, (err, result: any) => {
                    if (err) {
                        rejects("Error");
                    } else {
                        resolve(result);
                    }
                });
            });

            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    readOrdersByDate = async (req: Request, res: Response) => {
        try {
            const date = req.params.date; 
            
            const sql = "SELECT * FROM orders WHERE date = ?";
            const values = [date];

            const data = await new Promise<any>((resolve, rejects) => {
                db.query(sql, values, (err, result: any) => {
                    if (err) {
                        rejects("Error");
                    } else {
                        resolve(result);
                    }
                });
            });

            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    deleteOrderById = async (req: Request, res: Response) => {
        try {
            const orderId = req.params.orderId; 
            
            const sql = "DELETE FROM orders WHERE id = ?";
            const values = [orderId];

            const data = await new Promise<any>((resolve, rejects) => {
                db.query(sql, values, (err, result: any) => {
                    if (err) {
                        rejects("Error");
                    } else {
                        resolve(result);
                    }
                });
            });

            return res.json({ message: "Order deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    readOrders = async (req: Request, res: Response) => {
        try {
            const results = await new Promise<any>((resolve, rejects) => {
                db.query('SELECT * FROM orders', (err, results) => {
                    if (err) {
                        rejects(err);
                        return;
                    }
                    resolve(results)
                });
            });
    
            res.json(results)
        } catch (err: any) {
            res.status(500).json({ error: err.message})
        }
    }
}

module.exports = new OrderService();
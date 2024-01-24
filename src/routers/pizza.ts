import express from 'express';
import { Request, Response } from 'express';
import db from '../db/mysql';

const router = express.Router();

router.get('/pizza_menu', async (req: Request, res: Response) => {
    try {
        const results = await new Promise<any>((resolve, rejects) => {
            db.query('SELECT * FROM pizza_menu', (err, results) => {
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
});

module.exports = router
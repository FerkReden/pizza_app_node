import { Request, Response } from 'express';
import db from '../db/mysql.js';
import { User } from '../models/user'
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserService{
    createUser = async (req: Request, res: Response) => {
        try {
            const user = new User(
                0,
                req.body.name,
                req.body.email,
                req.body.password,
                req.body.phone,
                ''
            );

            const hashedPassword = await bcrypt.hash(user.password, 10);

            const sql = "INSERT INTO users (name, email, password, phone, token) VALUES (?, ?, ?, ?, ?)";
            const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });
            const values = [user.name, user.email, hashedPassword, user.phone, token];

            const data = await new Promise<any>((resolve, reject) => {
                db.query(sql, values, (err, result: any) => {
                    if (err) {
                        reject("Error");
                    } else {
                        user.userId = result.insertId;
                        user.token = token;
                        res.setHeader('Authorization', `Bearer ${token}`);
                        return res.json({ user, token });
                    }
                });
            });

            return res.json(data);
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };

    logIn = async (req: Request, res: Response) => {
        try {
          const email = req.body.email;
          const password = req.body.password;
      
          const sql = "SELECT userId, name, email, password FROM users WHERE email = ?";
          const values = [email];
      
          const userData = await new Promise<any>((resolve, reject) => {
            db.query(sql, values, async (err, result) => {
              if (err) {
                reject("Error");
              } else {
                resolve(result);
              }
            });
          });
      
          if (userData.length > 0) {
            const user = userData[0];
      
            const passwordMatch = await bcrypt.compare(password, user.password);
      
            if (passwordMatch) {
              const token = jwt.sign({ userId: user.userId }, 'your_secret_key', { expiresIn: '1h' });
      
              const updateTokenSql = "UPDATE users SET token = ? WHERE userId = ?";
              const updateTokenValues = [token, user.userId];
      
              db.query(updateTokenSql, updateTokenValues, (err) => {
                if (err) {
                  return res.status(500).json({ error: "Error updating token in database" });
                } else {
                  user.token = token;
                  res.setHeader('Authorization', `Bearer ${token}`);
                  return res.json({ user, token });
                }
              });
            } else {
              return res.status(401).json({ error: "Invalid credentials" });
            }
          } else {
            return res.status(404).json({ error: "User not found" });
          }
        } catch (error) {
          return res.status(500).json({ error: "Internal Server Error" });
        }
      };

    deleteUserById = async (req: Request, res: Response) => {
        try {
            const userId = req.params.userId; 
            
            const sql = "DELETE FROM users WHERE userId = ?";
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

            return res.json({ message: "User deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    };
    
    readUsers = async (req: Request, res: Response) => {
        try {
            const results = await new Promise<any>((resolve, rejects) => {
                db.query('SELECT * FROM users', (err, results) => {
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

module.exports = new UserService();
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

const auth = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.header("Authorization");

        if (!authorizationHeader) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const token: string | undefined = authorizationHeader.replace("Bearer ", "");

        try {
            const decoded: JwtPayload = jwt.verify(token, 'your_secret_key') as JwtPayload;

            if (decoded && decoded.userId) {
                if (decoded.userId !== req.body.userId) {
                    return res.status(401).json({ error: "Unauthorized: User IDs do not match" });
                }

                next();
            } else {
                return res.status(401).json({ error: "Unauthorized here" });
            }
        } catch (error) {
            console.error(error);
            return res.status(401).json({ error: "Unauthorized here" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export default auth;

import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { verifyToken } from "@utils/auth";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
    req: Request, res: Response, next: NextFunction
): Promise<void> => {
    //Recupera Token
    const authorization = req.headers.authorization;
    //console.log('authorization', authorization);
    
    //Valida Token
    await verifyToken(authorization)
    .then(() => {
        //Passa para próxima função
        next();
    })
    .catch((error) => {
        new ReturnError(res, error);
    });
}

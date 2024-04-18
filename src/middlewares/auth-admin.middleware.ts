import { UserTypeEnum } from "@enums/user-type.enum";
import { ReturnError } from "@exceptions/dtos/return-error.dto";
import { UnauthorizedException } from "@exceptions/unauthorized-exception";
import { UserAuth } from "@modules/auth/dtos/user-auth.dto";
import { verifyToken } from "@utils/auth";
import { NextFunction, Request, Response } from "express";

export const authAdminMiddleware = async (
    req: Request, res: Response, next: NextFunction
): Promise<void> => {
    //Recupera Token
    const authorization = req.headers.authorization;
    //console.log('authorization', authorization);
    
    //Valida Token
    const user = await verifyToken(authorization)
    .then((user: UserAuth) => {
        if(user.typeUser !== UserTypeEnum.ADMIN){
            new ReturnError(res, new UnauthorizedException());
        }else{
            next();
        }
    })
    .catch((error) => {
        new ReturnError(res, error);
    });
}

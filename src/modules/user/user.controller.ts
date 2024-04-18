import { Request, Response, Router } from "express";
import { createUser, getUsers } from "./user.service";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { ReturnError } from "@exceptions/dtos/return-error.dto";
//import { authMiddleware } from "src/middlewares/auth.middleware";
import { authAdminMiddleware } from "src/middlewares/auth-admin.middleware";

const createUserController = async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> =>{
    const userData: UserInsertDTO = {
        cpf: req.body.cpf,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        typeUser: req.body.typeUser,
        phone: req.body.phone
        // Adicione outras propriedades conforme necessário
    };
    const user = await createUser(userData).catch((error) => {
        new ReturnError(res, error);
    });
    res.json(user);
};

const getUsersController = async (req: Request, res: Response): Promise<void> =>{
    
    const users = await getUsers().catch((error) => {
        if(error instanceof NotFoundException){
            res.status(204);
        }else{
            new ReturnError(res, error);
        }
    });

    res.json(users);
};

const userRouter = Router();
userRouter.use('/user', userRouter);

userRouter.post('/', createUserController);

//O que estiver ANTES do MIDDLEWARE não será processado por ele.
//userRouter.use(authMiddleware);
userRouter.use(authAdminMiddleware);

userRouter.get('/', getUsersController);

export default userRouter;

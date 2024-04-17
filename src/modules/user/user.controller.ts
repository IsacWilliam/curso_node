import { Request, Response, Router } from "express";
import { createUser, getUsers } from "./user.service";
import { UserInsertDTO } from "./dtos/user-insert.dto";
import { NotFoundException } from "@exceptions/not-found-exception";
import { verifyToken } from "@utils/auth";

const userRouter = Router();

userRouter.use('/user', userRouter);

userRouter.get('/', async (req: Request, res: Response): Promise<void> =>{
    const authorization = req.headers.authorization;
    
    await verifyToken(authorization);

    const users = await getUsers().catch((error) => {
        if(error instanceof NotFoundException){
            res.status(204);
        }else{
            throw new Error(error);
        }
    });

    res.json(users);
});

userRouter.post('/', async (req: Request<undefined, undefined, UserInsertDTO>, res: Response): Promise<void> =>{
    const userData: UserInsertDTO = {
        cpf: req.body.cpf,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        typeUser: req.body.typeUser,
        phone: req.body.phone
        // Adicione outras propriedades conforme necessário
    };
    const user = await createUser(userData);
    res.json(user);
});

export default userRouter;

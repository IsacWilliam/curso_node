import { Request, Response, Router } from "express";
import { createUser, getUsers } from "./user.service";
import { UserInsertDTO } from "./dtos/user-insert.dto";

const userRouter = Router();

userRouter.get('/', async (_, res: Response): Promise<void> =>{
    const users = await getUsers();
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

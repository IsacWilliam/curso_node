import { Router } from "express";
import { PrismaClient } from '@prisma/client'

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async function(req, res){
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();

    //res.send('Hello World User Controller AGORA!');
    res.send(users);
});

router.get('/:nome', function(req, res){
    let nome = req.params.nome
    res.send('Nome do usuário: '+ `${nome}`);
});

export default userRouter;
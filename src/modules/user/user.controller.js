import { Router } from "express";

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', function(req, res){
    res.send('Hello World User Controller AGORA!');
});

router.get('/:nome', function(req, res){
    let nome = req.params.nome
    res.send('Nome do usuário: '+ `${nome}`);
});

export default userRouter;
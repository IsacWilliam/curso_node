import { Router } from "express";
import { createUser, getUsers } from "./user.service";

const userRouter = Router();

const router = Router();

userRouter.use('/user', router);

router.get('/', async (req, res) =>{
    const users = await getUsers();
    res.send(users);
    //res.send('Hello World User Controller AGORA!');
});
// router.get('/:nome', function(req, res){
//     let nome = req.params.nome
//     res.send('Nome do usuário: '+ `${nome}`);
// });

router.post('/', async (req, res) =>{
    const user = await createUser(req.body);
    res.send(user);
});

export default userRouter;
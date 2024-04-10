import { Router } from "express";

const productRouter = Router();

const router = Router();

productRouter.use('/product', router);

router.get('/', function(req, res){
    res.send('Produto');
});

export default productRouter;
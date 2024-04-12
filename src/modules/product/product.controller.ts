import { Response, Router } from "express";

const productRouter = Router();

productRouter.use('/product', productRouter);

productRouter.get('/', (_, res: Response): void => {
    res.send('Produto');
});

export default productRouter;
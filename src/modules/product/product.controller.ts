import { Response, Router } from "express";

const getProduct = (_, res: Response): void => {
    res.send('Produto');
};

const productRouter = Router();
productRouter.use('/product', productRouter);

productRouter.get('/', getProduct);

export default productRouter;

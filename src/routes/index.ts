import { Router } from 'express';
import authRouter from './authRouter';
import categoryRouter from './categoryRouter';
import orderRouter from './orderRouter';
import productRouter from './productRouter';

const router = Router();

router.use(authRouter);
router.use(orderRouter);
router.use(productRouter);
router.use(categoryRouter);

router.get('/ping', (req, res) => {
    res.send('pong');
});

export default router;

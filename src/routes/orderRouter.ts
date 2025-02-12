import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { ensureAuthenticatedAdminMiddleware } from '../middlewares/authMiddlewareAdmin';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { orderSchema } from '../schemas/orderSchema';
import { orderUpdateSchema } from '../schemas/orderSchema';

import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from '../controllers/orderController';

const orderRouter = Router();

orderRouter.get('/orders', getAllOrders);
orderRouter.get('/orders/:id', getOrderById);
orderRouter.post('/orders', ensureAuthenticatedMiddleware, validateSchemaMiddleware(orderSchema), createOrder);
orderRouter.put('/orders', ensureAuthenticatedAdminMiddleware, validateSchemaMiddleware(orderUpdateSchema), updateOrder);
orderRouter.delete('/orders/:id', ensureAuthenticatedAdminMiddleware, deleteOrder);

export default orderRouter;

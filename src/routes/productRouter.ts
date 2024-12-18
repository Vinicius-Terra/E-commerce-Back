import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { ensureAuthenticatedAdminMiddleware } from '../middlewares/authMiddlewareAdmin';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { productSchema } from '../schemas/productSchema';

import { getAllProducts, getProductByName, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const productRouter = Router();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:name', getProductByName);
productRouter.post('/products', ensureAuthenticatedAdminMiddleware, validateSchemaMiddleware(productSchema), createProduct);
productRouter.put('/products/:id', ensureAuthenticatedAdminMiddleware, validateSchemaMiddleware(productSchema), updateProduct);
productRouter.delete('/products/:id', ensureAuthenticatedAdminMiddleware, deleteProduct);

export default productRouter;

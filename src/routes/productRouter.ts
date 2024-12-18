import { Router } from 'express';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { productSchema } from '../schemas/productSchema';

import { getAllProducts, getProductByName, createProduct, updateProduct, deleteProduct } from '../controllers/productController';

const productRouter = Router();

productRouter.get('/products', getAllProducts);
productRouter.get('/products/:name', getProductByName);
productRouter.post('/products', ensureAuthenticatedMiddleware, validateSchemaMiddleware(productSchema), createProduct);
productRouter.put('/products/:id', ensureAuthenticatedMiddleware, validateSchemaMiddleware(productSchema), updateProduct);
productRouter.delete('/products/:id', ensureAuthenticatedMiddleware, deleteProduct);

export default productRouter;

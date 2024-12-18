import joi from 'joi';
import { ProductData } from '../repositories/productRepository';

//image is a url
export const productSchema = joi.object<ProductData>({
    name: joi.string().required(),
    description: joi.string().required(),
    image: joi.string().uri().required(),
    price: joi.number().required(),
    categoryId: joi.number().required()
});


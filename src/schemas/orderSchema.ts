import joi from 'joi';
import { OrderData } from '../repositories/orderRepository';
import { Order } from '@prisma/client';
import { OrderDataUpdate } from '../services/orderService';

enum OrderStatus {
    Preparing = 'Preparing',
    OnWay = 'OnWay',
    Delivered = 'Delivered'
}

//image is a url
export const orderSchema = joi.object<{order: OrderData, products: Array<{productId: number, quantity: number}>}>({
    order: joi.object({
        clientId: joi.number().required(),
    }),
    products: joi.array().items(joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required(),
    })).required(),
});

export const orderUpdateSchema = joi.object<{order: OrderDataUpdate, products: Array<{productId: number, quantity: number}>}>({   
    order: joi.object({
        id: joi.number().required(),
        clientId: joi.number().required(),
    }),
    products: joi.array().items(joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required(),
    })).required(),
});

import joi from 'joi';
import { OrderData } from '../repositories/orderRepository';
import { OrderDataUpdate } from '../services/orderService';

enum OrderStatus {
    Preparing = 'Preparing',
    OnWay = 'OnWay',
    Delivered = 'Delivered'
}

//image is a url
export const orderSchema = joi.object<{order: OrderData, products: Array<{productId: number, quantity: number}>}>({
    products: joi.array().items(joi.object({
        productId: joi.number().required(),
        quantity: joi.number().required(),
    })).required(),
});

export const orderUpdateSchema = joi.object<{order: OrderDataUpdate}>({   
    order: joi.object({
        id: joi.number().required(),
        status: joi.string().valid(...Object.values(OrderStatus)).required(),
    }),
});

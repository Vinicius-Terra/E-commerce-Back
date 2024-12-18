import { Request, Response } from 'express';
import { OrderData } from "../repositories/orderRepository";
import { orderService } from '../services/orderService';
import { OrderDataInput } from '../services/orderService';
import { OrderDataUpdate } from '../services/orderService';

export async function getAllOrders(req: Request, res: Response) {
    const orders = await orderService.getAllOrders();
    res.send(orders).status(200);
}

export async function getOrderById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const order = await orderService.getOrderById(id);
    res.send(order).status(200);
}

export async function createOrder(req: Request, res: Response) {
    const order: OrderDataInput = req.body;
    const products: Array<{productId: number, quantity: number}> = req.body.products;
    await orderService.createOrder(order, products);
    res.sendStatus(201);
}

export async function updateOrder(req: Request, res: Response) {
    const order: OrderDataUpdate = req.body;
    const products: Array<{productId: number, quantity: number}> = req.body.products;
    await orderService.updateOrder(order, products);
    res.sendStatus(200);
}

export async function deleteOrder(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await orderService.deleteOrder(id);
    res.sendStatus(200);
}

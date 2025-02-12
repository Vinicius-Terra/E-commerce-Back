import { OrderData } from "../repositories/orderRepository";
import * as orderRepository from "../repositories/orderRepository";
import * as categoryRepository from "../repositories/categoryRepository";
import * as clientRepository from "../repositories/clientRepository";
import { Order } from "@prisma/client";

// import error utils
import { conflictError, notFoundError } from "../utils/errorUtils";

export type OrderDataInput = Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>;
export type OrderDataUpdate = Omit<Order, 'createdAt' | 'updatedAt'>;


async function getAllOrders() {
    return orderRepository.getAllOrders();
}

async function getOrderById(id: number) {
    if (isNaN(id)) {
        throw notFoundError("Invalid id");
    }

    const order = await orderRepository.getOrderById(id);

    if (!order) {
        throw notFoundError("Order not found");
    }

    return order;
}

async function createOrder(userId: number, products: Array<{productId: number, quantity: number}>) {
    const existingClient = await clientRepository.getClientById(userId);

    if (!existingClient) {
        throw notFoundError("Client not found");
    }


    await orderRepository.createOrder(userId, products);
}

async function updateOrder(order: OrderDataUpdate) {

    if (isNaN(order.id)) {
        throw notFoundError("Invalid id");
    }

    const existingOrder = await orderRepository.getOrderById(order.id);

    if (!existingOrder) {
        throw notFoundError("Order not found");
    }


    await orderRepository.updateOrder(order);
}

async function deleteOrder(id: number) {

    const existingOrder = await orderRepository.getOrderById(id);

    if (!existingOrder) {
        throw notFoundError("Order not found");
    }

    await orderRepository.deleteOrder(id);
}

const orderService = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
};

export { orderService };

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

async function createOrder(order: OrderDataInput, products: Array<{productId: number, quantity: number}>) {
    const existingClient = await clientRepository.getClientById(order.clientId);

    if (!existingClient) {
        throw notFoundError("Client not found");
    }


    await orderRepository.createOrder(order, products);
}

async function updateOrder(order: OrderDataUpdate, products: Array<{productId: number, quantity: number}>) {

    if (isNaN(order.id)) {
        throw notFoundError("Invalid id");
    }

    const existingClient = await clientRepository.getClientById(order.clientId);
    const existingOrder = await orderRepository.getOrderById(order.id);

    if (!existingOrder) {
        throw notFoundError("Order not found");
    }

    if (!existingClient) {
        throw notFoundError("Client not found");
    }

    await orderRepository.updateOrder(order, products);
}

async function deleteOrder(id: number) {

    if (isNaN(id)) {
        throw notFoundError("Invalid id");
    }

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

import { prisma } from '../config/database';
import { Order } from '@prisma/client'; 
export type OrderData = Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'status'>;
export type OrderDataUpdate = Omit<Order, 'createdAt' | 'updatedAt'>;


export const createOrder = async (data: OrderData, products: Array<{productId: number, quantity: number}>): Promise<Order> => {
  const order = await prisma.order.create({
    data: {
      ...data,
    },
  });

  const orderProducts = products.map(product => {
    return {
      orderId: order.id,
      productId: product.productId,
      quantity: product.quantity
    }
  });

  await prisma.orderProduct.createMany({
    data: orderProducts
  });

  return order;
};

// Pega as orders e os produtos
export const getAllOrders = async (): Promise<Order[]> => {
  return await prisma.order.findMany({
    include: {
      orderProduct: {
        include: {
          product: true
        }
      }
    }
  });
}

export const getOrderById = async (id: number): Promise<OrderData | null> => {
  return await prisma.order.findUnique({
    where: { id },
    include: {
      orderProduct: {
        include: {
          product: true
        }
      }
    }
  });
};

export const updateOrder = async (data: OrderDataUpdate, products: Array<{productId: number, quantity: number}>): Promise<OrderData> => {

  const orderProducts = products.map(product => {
    return {
      orderId: data.id,
      productId: product.productId,
      quantity: product.quantity
    }
  });

  await prisma.orderProduct.updateMany({
    data: orderProducts
  });

  return await prisma.order.update({
    where: { id: data.id },
    data: {
      ...data,
    },
  });


};

export const deleteOrder = async (id: number): Promise<OrderData> => {

  await prisma.orderProduct.deleteMany({
    where: {
      orderId: id
    }
  });


  return await prisma.order.delete({
    where: { id },
  });
};

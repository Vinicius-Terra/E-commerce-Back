import { prisma } from '../config/database';
import { Product } from '@prisma/client';

export type ProductData = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const createProduct = async (data: ProductData): Promise<Product> => {
  return await prisma.product.create({
    data: {
      ...data,
    },
  });
};

export const getAllProducts = async (): Promise<Product[]> => {
  return await prisma.product.findMany();
};

export const getProductById = async (id: number): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { id },
  });
};

export const getProductByName = async (name: string): Promise<Product | null> => {
  return await prisma.product.findUnique({
    where: { name },
  });
};

export const updateProduct = async (data: ProductData, id: number): Promise<Product> => {
  return await prisma.product.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const deleteProduct = async (id: number): Promise<Product> => {

  await prisma.orderProduct.deleteMany({
    where: {
      productId: id
    }
  });

  return await prisma.product.delete({
    where: { id },
  });
};
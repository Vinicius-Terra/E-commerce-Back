import { prisma } from '../config/database';
import { Client } from '@prisma/client';

export type ClientData = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;

export const createClient = async (data: ClientData): Promise<Client> => {
  return await prisma.client.create({
    data: {
      ...data,
    },
  });
};

export const getAllClients = async (): Promise<Client[]> => {
  return await prisma.client.findMany();
};

export const getClientById = async (id: number): Promise<Client | null> => {
  return await prisma.client.findUnique({
    where: { id },
  });
};

export const getClientByEmail = async (email: string): Promise<Client | null> => {
  return await prisma.client.findUnique({
    where: { email },
  });
}

export const updateClient = async (data: Client, id: number): Promise<Client> => {
  return await prisma.client.update({
    where: { id },
    data: {
      ...data,
    },
  });
};

export const deleteClient = async (id: number): Promise<Client> => {
  return await prisma.client.delete({
    where: { id },
  });
};
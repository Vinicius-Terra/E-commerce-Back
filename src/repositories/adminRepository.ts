import { prisma } from '../config/database';
import {SignUpAdminData} from "../types/adminTypes";

export async function findById(id: number) {
  return prisma.admin.findUnique({
    where: { id }
  });
}

export async function findUserByEmail(email: string) {
  return prisma.admin.findUnique({
    where: {
      email
    }
  });
}

export async function insertUser(admin: SignUpAdminData) {
  return prisma.admin.create({
    data: admin
  });
}

import { prisma } from '../config/database';
import { Category } from '@prisma/client';

// remove id,createdAt and updateAt from Category
export type CategoryData = Omit<Category, "id" | "createdAt" | "updatedAt">

export async function getAllCategories() {
    return prisma.category.findMany();
}

export async function insertCategory(category: CategoryData) {
    return prisma.category.create({
        data: category
    });
}

export async function updateCategory(category: CategoryData, id: number) {
    return prisma.category.update({
        where: { id },
        data: category
    });
}

export async function deleteCategory(id: number) {
    return prisma.category.delete({
        where: { id }
    });
}

export async function getCategoryByName(name: string) {
    return prisma.category.findUnique({
        where: { name }
    });
}

export async function getCategoryById(id: number) {
    return prisma.category.findUnique({
        where: { id }
    });
}


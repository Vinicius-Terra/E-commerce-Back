import { CategoryData } from '../repositories/categoryRepository';
import * as categoryRepository from '../repositories/categoryRepository';

// import error utils
import { conflictError, notFoundError } from '../utils/errorUtils';

async function getAllCategories() {
    return categoryRepository.getAllCategories();
}

async function getCategoryByName(name: string) {
    const category = await categoryRepository.getCategoryByName(name);
    if (!category) throw notFoundError('Category not found');

    return category;
}

async function createCategory(category: CategoryData) {
    const existingCategory = await categoryRepository.getCategoryByName(category.name);

    if (existingCategory) {
        throw conflictError('There is a conflict, try other name');
    }

    await categoryRepository.insertCategory(category);
}

async function updateCategory(category: CategoryData) {
    const existingCategory = await categoryRepository.getCategoryByName(category.name);

    if (!existingCategory) {
        throw notFoundError('Category not found');
    }

    await categoryRepository.updateCategory(category, existingCategory.id);
}

async function deleteCategory(name: string) {
    const existingCategory = await categoryRepository.getCategoryByName(name);

    if (!existingCategory) {
        throw notFoundError('Category not found');
    }

    await categoryRepository.deleteCategory(existingCategory.id);
}

export const categoryService = {
    getAllCategories,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory
};

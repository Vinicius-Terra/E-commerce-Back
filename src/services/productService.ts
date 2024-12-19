import { ProductData } from "../repositories/productRepository";
import * as productRepository from "../repositories/productRepository";
import * as categoryRepository from "../repositories/categoryRepository";

// import error utils
import { conflictError, notFoundError } from "../utils/errorUtils";


async function getAllProducts() {
    return productRepository.getAllProducts();
}

async function getProductByName(name: string) {
    const product = await productRepository.getProductByName(name);
    if (!product) throw notFoundError("Product not found");

    return product;
}

async function createProduct(product: ProductData) {
    const existingProduct = await productRepository.getProductByName(product.name);
    const existingCategory = await categoryRepository.getCategoryById(product.categoryId);

    if (existingProduct) {
        throw conflictError("There is a conflict");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }

    await productRepository.createProduct(product);
}

async function updateProduct(product: ProductData, id: number) {

    if(isNaN(id)){
        throw notFoundError("Invalid id");
    }
    
    const existingCategory = await categoryRepository.getCategoryById(product.categoryId);
    const conflictExistingProduct = await productRepository.getProductByName(product.name);
    const existingProduct = await productRepository.getProductById(id);

    if (!existingProduct) {
        throw notFoundError("Product not found");
    }

    if (conflictExistingProduct && conflictExistingProduct.id !== id) {
        throw conflictError("Product name must be unique");
    }

    if (!existingCategory) {
        throw notFoundError("Category not found");
    }

    await productRepository.updateProduct(
        product,
        id);
}

async function deleteProduct(id: number) {

    if(isNaN(id)){
        throw notFoundError("Invalid id");
    }

    const existingProduct = await productRepository.getProductById(id);

    if (!existingProduct) {
        throw notFoundError("Product not found");
    }

    await productRepository.deleteProduct(existingProduct.id);
}

const productService = {
    getAllProducts,
    getProductByName,
    createProduct,
    updateProduct,
    deleteProduct,
};

export { productService };


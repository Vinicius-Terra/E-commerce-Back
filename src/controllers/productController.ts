import { Request, Response } from 'express';
import { ProductData } from "../repositories/productRepository";
import { productService } from '../services/productService';

export async function getAllProducts(req: Request, res: Response) {
    const products = await productService.getAllProducts();
    res.send(products).status(200);
}

export async function getProductByName(req: Request, res: Response) {
    const name = req.params.name;
    const product = await productService.getProductByName(name);
    res.send(product).status(200);
}

export async function createProduct(req: Request, res: Response) {
    const product: ProductData = req.body;
    await productService.createProduct(product);
    res.sendStatus(201);
}

export async function updateProduct(req: Request, res: Response) {
    const product: ProductData = req.body;
    const id = parseInt(req.params.id);
    await productService.updateProduct(product, id);
    res.sendStatus(200);
}

export async function deleteProduct(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    await productService.deleteProduct(id);
    res.sendStatus(200);
}

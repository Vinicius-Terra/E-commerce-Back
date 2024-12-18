import { Request, Response } from 'express';
import { categoryService } from '../services/categoryService';

export async function getAllCategories(req: Request, res: Response) {
    const professor = await categoryService.getAllCategories();
    res.send(professor).status(200);
}
import { Request, Response } from 'express';
import {SignUpAdminData, SignInAdminData} from "../types/adminTypes"
import userService from '../services/adminService';

export async function signUp(req: Request, res: Response) {
  const admin:SignUpAdminData = req.body;
  await userService.createAdmin(admin);
  res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
  const admin:SignInAdminData = req.body;
  const token = await userService.login(admin);
  res.send({ token }).status(200);
}

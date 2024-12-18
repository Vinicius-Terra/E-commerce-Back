import { Request, Response } from 'express';
import {SignUpAdminData, SignInAdminData} from "../types/adminTypes"
import userService from '../services/usersService';

export async function signUpAdmin(req: Request, res: Response) {
  const admin:SignUpAdminData = req.body;
  await userService.createAdmin(admin);
  res.sendStatus(201);
}

export async function signUpClient(req: Request, res: Response) {
  const client:SignUpAdminData = req.body;
  await userService.createClient(client);
  res.sendStatus(201);
}

export async function signInAdmin(req: Request, res: Response) {
  const admin:SignInAdminData = req.body;
  const token = await userService.loginAdmin(admin);
  res.send({ token }).status(200);
}

export async function signInClient(req: Request, res: Response) {
  const client:SignInAdminData = req.body;
  const token = await userService.loginClient(client);
  res.send({ token }).status(200);
}

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SignUpAdminData, SignInAdminData} from "../types/adminTypes";

import * as adminRepository from '../repositories/adminRepository';
import * as clientRepository from '../repositories/clientRepository';

import {
  conflictError,
  notFoundError,
  unauthorizedError
} from '../utils/errorUtils';

async function createAdmin(admin: SignUpAdminData) {
  delete admin.confirmPassword;

  const existingAdmin = await adminRepository.findUserByEmail(admin.email);

  if (existingAdmin) {
    throw conflictError('There is a conflict');
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(admin.password, SALT);
  await adminRepository.insertUser({ ...admin, password: hashedPassword });
}

async function createClient(user: SignUpAdminData){
  delete user.confirmPassword;

  const existingClient = await clientRepository.getClientByEmail(user.email);

  if (existingClient) {
    throw conflictError('There is a conflict');
  }

  const SALT = 10;
  const hashedPassword = bcrypt.hashSync(user.password, SALT);
  await clientRepository.createClient({ ...user, password: hashedPassword });
}

async function loginAdmin(login: SignInAdminData) {
  const admin = await getAdminOrFail(login);
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET);

  return token;
}

async function getAdminOrFail(login: SignInAdminData) {
  const user = await adminRepository.findUserByEmail(login.email);
  if (!user) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');

  return user;
}


async function loginClient(login: SignInAdminData) {
  const client = await clientRepository.getClientByEmail(login.email);
  if (!client) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, client.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId: client.id }, process.env.JWT_SECRET);

  return token;
}


async function getAdminByIdOrFail(id: number) {
  const user = await adminRepository.findById(id);
  if (!user) throw notFoundError('User not found');

  return user;
}


const authService = {
  createAdmin,
  createClient,
  loginAdmin,
  loginClient,
  getAdminByIdOrFail,
  getAdminOrFail,
};

export default authService;

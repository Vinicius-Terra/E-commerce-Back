import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {SignUpAdminData, SignInAdminData} from "../types/adminTypes";

import * as adminRepository from '../repositories/adminRepository';
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

async function login(login: SignInAdminData) {
  const admin = await getUserOrFail(login);
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }
  const token = jwt.sign({ userId: admin.id }, process.env.JWT_SECRET);

  return token;
}

async function getUserOrFail(login: SignInAdminData) {
  const user = await adminRepository.findUserByEmail(login.email);
  if (!user) throw unauthorizedError('Invalid credentials');

  const isPasswordValid = bcrypt.compareSync(login.password, user.password);
  if (!isPasswordValid) throw unauthorizedError('Invalid credentials');

  return user;
}


const authService = {
  createAdmin,
  login,
};

export default authService;

import joi from 'joi';
import {SignUpAdminData, SignInAdminData} from "../types/adminTypes"

// email checking the IANA list
export const signUpSchema = joi.object<SignUpAdminData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
})

export const signInSchema = joi.object<SignInAdminData>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { signUpSchema, signInSchema } from '../schemas/adminSchema';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { signIn, signUp } from './../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), signUp);
authRouter.post('/signin', validateSchemaMiddleware(signInSchema), signIn);
authRouter.post('/isauth', ensureAuthenticatedMiddleware, (req, res) => { res.send('true').status(200)});

export default authRouter;

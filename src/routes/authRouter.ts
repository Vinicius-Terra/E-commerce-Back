import { Router } from 'express';
import { validateSchemaMiddleware } from '../middlewares/schemaMiddleware';
import { signUpSchema, signInSchema } from '../schemas/authSchema';
import { ensureAuthenticatedMiddleware } from '../middlewares/authMiddleware';
import { signInAdmin, signInClient, signUpClient } from './../controllers/authController';

const authRouter = Router();

authRouter.post('/signup', validateSchemaMiddleware(signUpSchema), signUpClient);
authRouter.post('/signin', validateSchemaMiddleware(signInSchema), signInClient);
authRouter.post('/signin/admin', validateSchemaMiddleware(signInSchema), signInAdmin);
authRouter.post('/isauth', ensureAuthenticatedMiddleware, (req, res) => { res.send('true').status(200)});

export default authRouter;

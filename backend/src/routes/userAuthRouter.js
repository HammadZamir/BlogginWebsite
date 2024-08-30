import express from 'express';
import { signupController, signinController } from '../controllers/userAuthController.js';
import { SignupValidation, SigninValidation } from '../middlewares/userAuthValidation.js';

const router = express.Router();

router.post('/signup' , SignupValidation , signupController)
router.post('/signin' , SigninValidation , signinController)


export default router;





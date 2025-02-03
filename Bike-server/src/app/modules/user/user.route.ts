import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { userCreateValidationSchema } from './user.validation';
import { userController } from './user.controller';
import { AuthValidation } from '../Auth/auth.validation';
import { AuthControllers } from '../Auth/auth.controller';
import auth from '../../middlewares/auth';


const router=express.Router();

router.post('/register',validateRequest(userCreateValidationSchema),userController.createUser);
router.get('/getUser',userController.getSingleUser);
router.post('/login',validateRequest(AuthValidation.loginValidationSchema),AuthControllers.loginUser)
router.post('/refresh-token',validateRequest(AuthValidation.refreshTokenValidationSchema),
AuthControllers.refreshToken)
router.post('/change-password',auth('customer'),AuthControllers.changePassword)


export const UserRoutes=router;
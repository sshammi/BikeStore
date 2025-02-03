import express from 'express'
import { AdminController } from './admin.controller';
import auth from '../../middlewares/auth';

const router=express.Router();

router.patch('/block/:userId',auth('admin'),AdminController.blockUser);
router.delete('/blogs/:id',auth('admin'),AdminController.deleteBlog);
router.get('/all-users',auth('admin'),AdminController.getAllUsers)

export const AdminRoutes=router;
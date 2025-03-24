import express from 'express'
import { BikeValidation} from '../blog/blog.validation';
import { BlogController } from '../blog/blog.controller';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';

const router=express.Router();

router.post('',auth('admin'),validateRequest(BikeValidation.BikeCreateValidationSchema),BlogController.createBlog)
router.patch('/:id',auth('admin'),validateRequest(BikeValidation.BikeUpdateValidationSchema),BlogController.updateBlog)
router.delete('/:id',auth('admin'),BlogController.deleteBlog)
router.get('/flash',BlogController.getBikesOnFlashSale);
router.get('',BlogController.getAllBlogs)
router.get('/:id',BlogController.getSingleBlogs)

export const BlogRoutes=router;
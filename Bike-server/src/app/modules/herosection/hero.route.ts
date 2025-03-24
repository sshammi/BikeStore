import express from 'express'
import { BikeValidation} from '../blog/blog.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { HeroController } from './hero.controller';

const router=express.Router();

router.post('',auth('admin'),validateRequest(BikeValidation.BikeCreateValidationSchema),HeroController.createBlog)
router.patch('/:id',auth('admin'),validateRequest(BikeValidation.BikeUpdateValidationSchema),HeroController.updateBlog)
router.delete('/:id',auth('admin'),HeroController.deleteBlog)
router.get('',HeroController.getAllBlogs)
router.get('/:id',HeroController.getSingleBlogs)

export const HeroRoutes=router;
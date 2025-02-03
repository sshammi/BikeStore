import express from 'express'
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { OrderValidation } from './order.validation';
import { OrderController } from './order.controller';

const router=express.Router();

router.post('',auth('customer'),validateRequest(OrderValidation.OrderCreateValidationSchema),OrderController.createOrder)

router.get('/myOrders',auth('customer'),OrderController.getOrdersByEmail)

router.get('/verify', auth('customer'), OrderController.verifyPayment);
router.patch('/:id',auth('admin'),OrderController.updateOrder)

router.get('/:id',auth('admin'),OrderController.getSingleOrder)

router.delete('/:id',auth('admin'),OrderController.deleteOrder)


router.get('',OrderController.getAllOrders)



export const OrderRoutes=router;
import mongoose from 'mongoose';
import OrderSchema from '../schema/order.schema.js';

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;

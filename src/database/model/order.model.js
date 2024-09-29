import mongoose from 'mongoose';
import OrderSchema from '../schema/order.schema';

const OrderModel = mongoose.model('Order', OrderSchema);
export default OrderModel;

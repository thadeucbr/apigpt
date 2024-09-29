import mongoose from 'mongoose';
import OrderSchema from '../schema/order.schema.js';

const Order = mongoose.model('Order', OrderSchema);
export default Order;

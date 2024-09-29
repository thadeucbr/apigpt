import mongoose from 'mongoose';
import ProductSchema from '../schema/product.schema.js';

const Product = mongoose.model('Product', ProductSchema);
export default Product;

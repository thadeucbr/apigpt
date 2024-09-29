import mongoose from 'mongoose';
import ProductSchema from '../schema/product.schema.js';

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;

import mongoose from 'mongoose';
import ProductSchema from '../schema/product.schema';

const ProductModel = mongoose.model('Product', ProductSchema);
export default ProductModel;

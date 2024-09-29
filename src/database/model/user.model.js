import mongoose from 'mongoose';
import UserSchema from '../schema/user.schema.js';

const User = mongoose.model('User', UserSchema);
export default User;

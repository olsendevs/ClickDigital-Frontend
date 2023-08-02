import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  whatsapp: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  company: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

UserSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    const hashed = await bcrypt.hash(this['password'], 10);
    this['password'] = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
});

export interface User {
  id?: string;
  name: string;
  password: string;
  whatsapp: string;
  email: string;
  company: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

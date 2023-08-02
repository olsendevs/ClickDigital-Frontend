import mongoose from 'mongoose';

export const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cost: { type: mongoose.Types.Decimal128, required: true },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

export interface Service {
  id?: string;
  name: string;
  cost: number;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

import mongoose from 'mongoose';

export const PlanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: mongoose.Types.Decimal128, required: true },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

export interface Plan {
  id?: string;
  name: string;
  value: number;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

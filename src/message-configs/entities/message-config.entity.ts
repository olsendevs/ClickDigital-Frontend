import mongoose from 'mongoose';

export interface MessageConfig {
  fiveDaysBefore?: string;
  threeDaysBefore?: string;
  oneDayBefore?: string;
  EndDay?: string;
  oneDayAfter?: string;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

export const MessageConfigSchema = new mongoose.Schema({
  fiveDaysBefore: { type: String, required: false },
  threeDaysBefore: { type: String, required: false },
  oneDayBefore: { type: String, required: false },
  EndDay: { type: String, required: false },
  oneDayAfter: { type: String, required: false },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

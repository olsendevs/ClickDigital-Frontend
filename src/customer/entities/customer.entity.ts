import * as mongoose from 'mongoose';

export interface Customer {
  id?: string;
  name: string;
  whatsapp: string;
  login: string;
  password: string;
  serviceId: mongoose.Types.ObjectId | string | any;
  planId: mongoose.Types.ObjectId | string | any;
  invoice: string;
  validateDate: Date;
  sendNotificationOn: {
    fiveDaysBefore: {
      active: boolean;
      sended: boolean;
    };
    threeDaysBefore: {
      active: boolean;
      sended: boolean;
    };
    oneDayBefore: {
      active: boolean;
      sended: boolean;
    };
    EndDay: {
      active: boolean;
      sended: boolean;
    };
    oneDayAfter: {
      active: boolean;
      sended: boolean;
    };
  };
  comment?: string;
  userId: string;
  createAt: Date;
  updateAt: Date;
  deleted: boolean;
}

export const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  whatsapp: { type: String, required: true },
  login: { type: String, required: true },
  password: { type: String, required: true },
  serviceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service',
    required: true,
  },
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan', required: true },
  invoice: { type: String, required: true },
  comment: { type: String, required: false },
  validateDate: { type: Date, required: true },
  sendNotificationOn: {
    fiveDaysBefore: {
      active: { type: Boolean, required: true },
      sended: { type: Boolean, required: true },
    },
    threeDaysBefore: {
      active: { type: Boolean, required: true },
      sended: { type: Boolean, required: true },
    },
    oneDayBefore: {
      active: { type: Boolean, required: true },
      sended: { type: Boolean, required: true },
    },
    EndDay: {
      active: { type: Boolean, required: true },
      sended: { type: Boolean, required: true },
    },
    oneDayAfter: {
      active: { type: Boolean, required: true },
      sended: { type: Boolean, required: true },
    },
  },
  userId: { type: String, required: true },
  createAt: { type: Date, required: true },
  updateAt: { type: Date, required: true },
  deleted: { type: Boolean, required: true, default: false },
});

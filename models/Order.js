import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    customerType: {
      type: String,
      enum: ['guest', 'registered'],
      default: 'guest',
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
        },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
      },
    ],
    shippingAddress: {
      name: String,
      email: String,
      phone: String,
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    subtotal: Number,
    shippingCost: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    totalAmount: Number,
    paymentMethod: {
      type: String,
      enum: ['ssl-commerz', 'cod'],
      default: 'ssl-commerz',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'pending',
    },
    transactionId: String,
    orderStatus: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
    },
    notes: String,
    discount: {
      type: Number,
      default: 0,
    },
    promoCode: {
      type: String,
      default: null,
    },
    discountType: {
      type: String,
      enum: ['percentage', 'fixed', null],
      default: null,
    },
    cancelRequested: { type: Boolean, default: false },
    cancelReason: String,
    cancelDate: Date,
    refundRequested: { type: Boolean, default: false },
    refundReason: String,
    refundStatus: {
      type: String,
      enum: ['none', 'requested', 'approved', 'rejected'],
      default: 'none',
    },
    refundDate: Date,
    refundNote: String,
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);

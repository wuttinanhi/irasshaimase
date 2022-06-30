export enum EOrderStatus {
  // order status
  CREATED = 'CREATED',
  PENDING = 'PENDING',
  CANCELLED = 'CANCELLED',

  // delivery status
  PREPARING = 'PREPARING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RECEIVED = 'RECEIVED',

  // payment status
  PAID = 'PAID',
  REFUNDED = 'REFUNDED',

  // unused
  CONFIRMED = 'CONFIRMED',
}

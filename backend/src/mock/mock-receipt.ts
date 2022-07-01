import { IReceipt } from 'src/receipt/receipt.interface';

export const MOCK_RECEIPT: IReceipt = {
  logoFilePath: 'https://www.w3schools.com/html/pic_trulli.jpg',
  shopName: 'Irasshaimase',
  shopAddress: '000 Neverland Road Neverland Neverland Neverland',
  shopPhone: '1234567890',
  shopEmail: 'shop@example.com',
  shopWebsite: 'example.com',

  customerName: 'John Doe',
  customerAddress: '000 Neverland Road Neverland Neverland Neverland',
  customerPhone: '1234567890',
  customerEmail: 'john@example.com',

  invoiceId: '123456789',
  invoiceDate: new Date('/1/2020').toLocaleDateString(),
  invoiceDueDate: new Date('/1/2020').toLocaleDateString(),

  discount: 100,
  subTotal: 100,
  taxRate: 100,
  tax: 100,
  shippingAndHandling: 100,
  total: 200,

  note: 'Additional note',
  orderId: 1,
  status: 'Paid',

  items: [
    {
      description: 'Description 1',
      quantity: 1,
      unitPrice: 100,
      total: 100,
    },
    {
      description: 'Description 2',
      quantity: 2,
      unitPrice: 200,
      total: 200,
    },
  ],

  payments: [
    {
      paymentId: '123456789',
      paymentDate: new Date('/1/2020').toLocaleDateString(),
      paymentAmount: 100,
      paymentMethod: 'Cash',
    },
  ],
};

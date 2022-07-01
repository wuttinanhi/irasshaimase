export interface IReceiptItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface IReceiptPayment {
  paymentId: any;
  paymentDate: string;
  paymentMethod: string;
  paymentAmount: number;
}

export interface IReceipt {
  logoFilePath: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  shopEmail: string;
  shopWebsite: string;

  customerName: string;
  customerAddress: string;
  customerPhone: string;
  customerEmail: string;

  invoiceId: any;
  invoiceDate: string;
  invoiceDueDate: string;

  discount: number;
  subTotal: number;
  taxRate: number;
  tax: number;
  shippingAndHandling: number;
  total: number;

  status: string;
  orderId: any;
  note: string;

  items: IReceiptItem[];
  payments: IReceiptPayment[];
}

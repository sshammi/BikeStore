
export interface Torder {
    productName: string;
    productModel:string;
    quantity:string;
    price:string;
    customerName:string;
    address:string;
    customerEmail:string;
    phoneNumber:string;
    status: "Pending" | "Paid" | "Shipped" | "Completed" | "Cancelled";
    transaction: {
    id: string;
    transactionStatus: string;
    bank_status: string;
    sp_code: string;
    sp_message: string;
    method: string;
    date_time: string;
  };
}
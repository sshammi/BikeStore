export type TUser={
  _id:string;
  name: string;
  email: string;
  role: "admin" | "customer";
}
export type TBike={
  _id: string;
  name: string;
  image:string;
  brand: 'Honda'|'Yamaha'|'Kawasaki';
  price: string;
  model: 'Sport'|'Cruiser'|'Touring';
  category:'Superbike'|'Adenture'|'Commuter';
  stock: string;
}

export type Torder= {
    _id:string,
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
  }
}
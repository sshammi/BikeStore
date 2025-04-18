
export interface TBlogPost {
  name: string;
  image?:string;
  brand: 'Honda'|'Yamaha'|'Kawasaki';
  price: string;
  model: 'Sport'|'Cruiser'|'Touring';
  category:'Superbike'|'Adventure'|'Commuter';
  stock: string;
  flashSale:string;
  trending:string;
  popular:string;
  electric:string;
  upcoming:string;
}

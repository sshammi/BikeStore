import { model, Schema } from 'mongoose';
import { TBlogPost } from './blog.interface';

const BikePostSchema = new Schema<TBlogPost>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  brand: {
    type: String,
    enum: ['Honda', 'Yamaha', 'Kawasaki'],
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    enum: ['Sport', 'Cruiser', 'Touring'],
    required: true,
  },
  category: {
    type: String,
    enum: ['Superbike', 'Adventure', 'Commuter'],
    required: true,
  },
  stock: {
    type: String,
    required: true,
  },
  flashSale: {
    type: String,
    default: "false",
  },
  trending: {
    type: String,
    default: "false",
  },
  popular: {
    type: String,
    default: "false",
  },
  electric: {
    type: String,
    default: "false",
  },
  upcoming: {
    type: String,
    default: "false",
  },
});

const Bike = model<TBlogPost>('Bike', BikePostSchema);

export default Bike;

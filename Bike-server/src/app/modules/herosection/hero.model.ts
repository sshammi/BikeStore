import { model, Schema } from 'mongoose';
import { THero } from './hero.interface';

const BikePostSchema = new Schema<THero>({
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
});

const Hero = model<THero>('hero', BikePostSchema);

export default Hero;
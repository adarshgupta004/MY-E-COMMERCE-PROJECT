import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Precision Watch',
    description: 'Minimalist timepiece with Swiss movement and sapphire glass.',
    price: 299,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    stock: 12
  },
  {
    id: '2',
    name: 'Audio-X Pro',
    description: 'Noise-cancelling wireless headphones with 40h battery life.',
    price: 349,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    stock: 5
  },
  {
    id: '3',
    name: 'Modernist Chair',
    description: 'Ergonomic office chair designed for peak comfort and style.',
    price: 450,
    category: 'Furniture',
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=800',
    stock: 8
  }
];

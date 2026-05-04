/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { ShoppingBag, LayoutDashboard, Store, Plus, Search, Trash2, Edit, ChevronRight, X, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from './types';
import { INITIAL_PRODUCTS } from './constants';
import { cn } from './lib/utils';

// --- Components ---

const Navbar = ({ cartCount }: { cartCount: number }) => {
  const location = useLocation();
  
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
        <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center text-white">Z</div>
          <span>ZENITH</span>
        </Link>
        <div className="flex items-center gap-8 font-medium">
          <Link to="/" className={cn("transition-colors hover:text-black", location.pathname === '/' ? "text-black" : "text-gray-400")}>Store</Link>
          <Link to="/admin" className={cn("flex items-center gap-1.5 transition-colors hover:text-black", location.pathname === '/admin' ? "text-black" : "text-gray-400")}>
            <LayoutDashboard size={14} />
            Admin
          </Link>
          <Link to="/cart" className="relative group p-2">
            <ShoppingBag size={20} className="text-gray-700 group-hover:text-black transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

const ProductCard = ({ product, onAddToCart }: { product: Product; onAddToCart: (p: Product) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
  >
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
      <img 
        src={product.image} 
        alt={product.name} 
        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <button 
        onClick={() => onAddToCart(product)}
        className="absolute bottom-4 left-4 right-4 bg-black text-white py-3 rounded-xl font-medium translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 active:scale-95"
      >
        Add to Cart
      </button>
    </div>
    <div className="p-5">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 group-hover:text-black">{product.name}</h3>
        <span className="font-bold text-gray-900">${product.price}</span>
      </div>
      <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">{product.description}</p>
      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-300">
        <span className="bg-gray-50 px-2 py-1 rounded">{product.category}</span>
        {product.stock <= 5 && <span className="text-orange-400 bg-orange-50 px-2 py-1 rounded">Only {product.stock} left</span>}
      </div>
    </div>
  </motion.div>
);

const ProductModal = ({ isOpen, onClose, onSave, product }: { isOpen: boolean; onClose: () => void; onSave: (p: any) => void; product?: Product | null }) => {
  const [formData, setFormData] = useState<Partial<Product>>(product || {
    name: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    stock: 0
  });

  useEffect(() => {
    if (product) setFormData(product);
  }, [product]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
      />
      <motion.div 
        layoutId={product?.id || 'new'}
        className="relative bg-white w-full max-w-lg rounded-3xl p-8 shadow-2xl overflow-hidden"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight">{product ? 'Edit Product' : 'Add New Product'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X size={20} /></button>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onSave(formData); }} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Product Name</label>
              <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
            </div>
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Price ($)</label>
              <input required type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: Number(e.target.value) })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Category</label>
              <input required value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
            </div>
            <div className="space-y-1.5 flex flex-col">
              <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Stock</label>
              <input required type="number" value={formData.stock} onChange={e => setFormData({ ...formData, stock: Number(e.target.value) })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none" />
            </div>
          </div>
          <div className="space-y-1.5 flex flex-col">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Image URL</label>
            <input required value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none transition-all" />
          </div>
          <div className="space-y-1.5 flex flex-col">
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-1">Description</label>
            <textarea required rows={3} value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} className="bg-gray-50 border-none rounded-xl p-3 focus:ring-2 focus:ring-black outline-none resize-none" />
          </div>
          <button type="submit" className="w-full bg-black text-white py-4 rounded-xl font-bold mt-4 hover:shadow-lg hover:shadow-black/20 transition-all active:scale-[0.98]">
            {product ? 'Update Inventory' : 'Create Product'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('zenith_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });
  
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('zenith_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    localStorage.setItem('zenith_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('zenith_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleSaveProduct = (data: Partial<Product>) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...data } as Product : p));
    } else {
      setProducts([...products, { ...data, id: Date.now().toString() } as Product]);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this item from the catalog?')) {
      setProducts(products.filter(p => p.id !== id));
      setCart(cart.filter(item => item.id !== id));
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
        <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
        
        <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
          <Routes>
            <Route path="/" element={
              <div className="space-y-12">
                <header className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-900">Curated Collection</h1>
                  <p className="text-gray-500 max-w-lg">Discover our selection of premium, minimalist essentials crafted for quality and durability.</p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                  ))}
                </div>
              </div>
            } />

            <Route path="/admin" element={
              <div className="space-y-12">
                <div className="flex justify-between items-end bg-black text-white p-10 rounded-[2.5rem] shadow-xl overflow-hidden relative group">
                  <div className="space-y-4 z-10">
                    <h1 className="text-4xl font-bold tracking-tight">Inventory Control</h1>
                    <p className="text-gray-400 text-sm font-medium">Manage your product catalog, updates, and stock levels effortlessly.</p>
                  </div>
                  <button 
                    onClick={() => { setEditingProduct(null); setIsModalOpen(true); }}
                    className="z-10 bg-white text-black px-8 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-transform active:scale-95"
                  >
                    <Plus size={18} /> New Product
                  </button>
                  <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                    <LayoutDashboard size={200} />
                  </div>
                </div>

                <div className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="p-6 text-[11px] font-bold uppercase tracking-wider text-gray-400">Product</th>
                          <th className="p-6 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-center">Category</th>
                          <th className="p-6 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-center">Price</th>
                          <th className="p-6 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-center">Stock</th>
                          <th className="p-6 text-[11px] font-bold uppercase tracking-wider text-gray-400 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {products.map(product => (
                          <tr key={product.id} className="group hover:bg-gray-50/30 transition-colors">
                            <td className="p-6">
                              <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 p-1 border border-gray-100">
                                  <img src={product.image} className="w-full h-full object-cover rounded-lg" alt={product.name} />
                                </div>
                                <div>
                                  <div className="font-bold text-gray-900">{product.name}</div>
                                  <div className="text-xs text-gray-400 truncate w-48">{product.description}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-6 text-center text-sm font-medium text-gray-600">
                              <span className="bg-white border border-gray-100 px-3 py-1 rounded-full">{product.category}</span>
                            </td>
                            <td className="p-6 text-center font-bold text-gray-900">${product.price}</td>
                            <td className="p-6 text-center">
                              <span className={cn(
                                "text-xs font-bold px-3 py-1 rounded-full",
                                product.stock > 10 ? "text-green-500 bg-green-50" : "text-orange-500 bg-orange-50"
                              )}>{product.stock} units</span>
                            </td>
                            <td className="p-6 text-right space-x-2">
                              <button 
                                onClick={() => { setEditingProduct(product); setIsModalOpen(true); }}
                                className="p-2.5 hover:bg-gray-100 rounded-xl text-gray-400 hover:text-black transition-all"
                              >
                                <Edit size={18} />
                              </button>
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="p-2.5 hover:bg-orange-50 rounded-xl text-gray-300 hover:text-orange-500 transition-all"
                              >
                                <Trash2 size={18} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            } />

            <Route path="/cart" element={
              <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex items-center gap-4">
                  <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={24}/></Link>
                  <h1 className="text-3xl font-bold tracking-tight">Shopping Bag</h1>
                </header>
                
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-6 bg-white border border-dashed border-gray-200 rounded-[2rem]">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                      <ShoppingBag size={40} />
                    </div>
                    <div className="space-y-1">
                      <h2 className="text-xl font-bold">Your bag is empty</h2>
                      <p className="text-gray-400 text-sm">Looks like you haven't added anything yet.</p>
                    </div>
                    <Link to="/" className="inline-block bg-black text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all active:scale-95">Start Browsing</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-4">
                      <AnimatePresence mode="popLayout">
                        {cart.map(item => (
                          <motion.div 
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white p-4 rounded-3xl border border-gray-100 flex gap-6 items-center group"
                          >
                            <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0">
                              <img src={item.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={item.name} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                              <p className="text-xs text-gray-400 truncate mb-3">{item.category}</p>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                  <button onClick={() => updateQuantity(item.id, -1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all text-gray-500 hover:text-black">
                                    <X size={14} className="rotate-45" />
                                  </button>
                                  <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                  <button onClick={() => updateQuantity(item.id, 1)} className="w-8 h-8 flex items-center justify-center hover:bg-white rounded-md shadow-sm transition-all text-gray-500 hover:text-black">
                                    <Plus size={14} />
                                  </button>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-[11px] font-bold text-orange-400 hover:text-orange-600 uppercase tracking-widest transition-colors">Remove</button>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-lg">${item.price * item.quantity}</div>
                              <div className="text-[10px] text-gray-400 font-medium">${item.price} each</div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                    
                    <div className="lg:col-span-1">
                      <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6 sticky top-32">
                        <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>
                        <div className="space-y-4 text-sm">
                          <div className="flex justify-between text-gray-500">
                            <span>Subtotal</span>
                            <span className="font-bold text-gray-900">${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                          </div>
                          <div className="flex justify-between text-gray-500">
                            <span>Shipping</span>
                            <span className="font-bold text-gray-900">Calculated at next step</span>
                          </div>
                          <div className="h-px bg-gray-100" />
                          <div className="flex justify-between text-lg pt-2">
                            <span className="font-bold">Total</span>
                            <span className="font-bold">${cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)}</span>
                          </div>
                        </div>
                        <button className="w-full bg-black text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 group hover:shadow-xl hover:shadow-black/20 transition-all active:scale-[0.98]">
                          Checkout <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <p className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest">Secure checkout with SSL encryption</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            } />
          </Routes>
        </main>

        <footer className="border-t border-gray-100 bg-white py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-6">
            <div className="flex items-center justify-center gap-2 font-bold text-xl tracking-tight">
              <div className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">Z</div>
              <span>ZENITH</span>
            </div>
            <p className="text-gray-400 text-xs max-w-xs mx-auto leading-relaxed">Redefining modern essentials through sustainable craftsmanship and timeless design.</p>
            <div className="h-px w-10 bg-gray-100 mx-auto" />
            <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-300">
              © 2024 Zenith Market Platform
            </div>
          </div>
        </footer>

        <AnimatePresence>
          {isModalOpen && (
            <ProductModal 
              isOpen={isModalOpen} 
              onClose={() => setIsModalOpen(false)} 
              onSave={handleSaveProduct} 
              product={editingProduct}
            />
          )}
        </AnimatePresence>
      </div>
    </Router>
  );
}

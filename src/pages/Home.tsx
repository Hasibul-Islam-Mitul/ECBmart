import { useEffect, useState } from 'react';
import { collection, getDocs, limit, query } from 'firebase/firestore';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag, Leaf, Zap, Heart, Star } from 'lucide-react';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';

import sampleProducts from '../data/products.json';

const CATEGORIES = [
  { id: 'food', name: 'Fresh Food', icon: Leaf, color: 'bg-emerald-50 text-brand-green' },
  { id: 'cosmetics', name: 'Cosmetics', icon: Heart, color: 'bg-rose-50 text-rose-600' },
  { id: 'toys', name: 'Kids Toys', icon: Star, color: 'bg-amber-50 text-amber-600' },
  { id: 'electronics', name: 'Electronics', icon: Zap, color: 'bg-indigo-50 text-indigo-600' },
];

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const q = query(collection(db, 'products'), limit(12));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProducts(data.length > 0 ? data : sampleProducts);
      } catch (err) {
        console.error(err);
        setProducts(sampleProducts);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="space-y-20 pb-32">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center pt-10">
        <div className="absolute inset-x-4 top-4 bottom-4 rounded-[40px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920&h=1080"
            alt="ECB Mart Premium"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/40 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-12 w-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-orange rounded-full text-xs font-bold uppercase tracking-wider">
              <ShoppingBag className="h-4 w-4" /> Exclusive for ECB Residents
            </div>
            <h1 className="text-6xl md:text-8xl font-display font-bold leading-[1.1]">
              Elevate Your <br />
              <span className="text-brand-orange">Lifestyle.</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-lg leading-relaxed">
              Discover a curated collection of fresh organics, luxury cosmetics, and the latest tech essentials.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <button className="px-10 py-5 bg-brand-green hover:bg-brand-orange text-white font-bold rounded-2xl transition-all duration-300 flex items-center gap-3 shadow-2xl shadow-brand-green/20">
                Explore Collection <ArrowRight className="h-5 w-5" />
              </button>
              <button className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-2xl border border-white/30 transition-all">
                Our Story
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Circles */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-display mb-4">Shop by Category</h2>
          <div className="w-20 h-1.5 bg-brand-orange mx-auto rounded-full" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group flex flex-col items-center gap-6 cursor-pointer"
            >
              <div className={cn(
                "w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-2xl",
                cat.color
              )}>
                <cat.icon className="h-12 w-12" />
              </div>
              <span className="text-lg font-bold tracking-tight text-brand-navy">{cat.name}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-end mb-12">
          <div className="space-y-2">
            <h2 className="text-4xl font-display">New Arrivals</h2>
            <p className="text-gray-500 font-medium tracking-wide uppercase text-xs">Premium picks for your home</p>
          </div>
          <button className="group flex items-center gap-2 text-brand-navy font-bold hover:text-brand-orange transition-colors">
            View All <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brutalist Promo Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-brand-navy rounded-[40px] p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <div className="grid grid-cols-4 gap-4 p-4 grayscale">
                {[...Array(8)].map((_, i) => <div key={i} className="aspect-square bg-white rounded-lg" />)}
             </div>
          </div>
          <div className="relative z-10 max-w-xl space-y-6">
            <h2 className="text-5xl text-white font-display">Freshness guaranteed, <br/><span className="text-brand-orange">Always.</span></h2>
            <p className="text-gray-400 text-lg">We source directly from local farmers to ensure you get the best quality food in Bangladesh.</p>
            <button className="px-8 py-4 bg-white text-brand-navy font-bold rounded-2xl hover:bg-brand-orange hover:text-white transition-all duration-300">
              Join Our Membership
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

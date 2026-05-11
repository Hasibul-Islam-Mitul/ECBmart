import { motion } from 'motion/react';
import { ShoppingCart, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl: string;
    category: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-brand-green text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg">
            {product.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-brand-navy mb-2 line-clamp-1 font-display">{product.name}</h3>
        <p className="text-xs text-gray-400 mb-4 line-clamp-2 leading-relaxed">
          Premium quality essentials selected for ECB residents.
        </p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-brand-navy font-display">৳{product.price}</span>
            <span className="text-[10px] text-brand-green font-bold">IN STOCK</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-brand-navy hover:bg-brand-orange text-white rounded-2xl transition-all duration-300 shadow-xl shadow-brand-navy/10 active:scale-95"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}


import React from 'react';
import { Product } from '../types';
import { Plus } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ProductCardProps {
  product: Product;
  onAdd: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAdd }) => {
  const { t } = useLanguage();
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-brand-blue shadow-sm">
          {t.shop.product.currency}{product.price.toFixed(2)}
        </div>
        {product.freshness === 'High' && (
            <div className="absolute top-3 left-3 bg-brand-blue/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-brand-yellow rounded-full animate-pulse"></span>
                {t.shop.product.fresh}
            </div>
        )}
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">
            {t.shop.categories[product.category as keyof typeof t.shop.categories] || product.category}
        </div>
        <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">{product.description}</p>
        
        <button 
          onClick={() => onAdd(product)}
          className="w-full mt-auto flex items-center justify-center gap-2 bg-gray-50 hover:bg-brand-yellow hover:text-brand-blue text-gray-900 font-semibold py-2.5 px-4 rounded-xl transition-all duration-300"
        >
          <Plus size={16} />
          {t.shop.product.addToCart}
        </button>
      </div>
    </div>
  );
};

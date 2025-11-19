
import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ProductCard } from '../components/ProductCard';
import { getSmartSuggestions } from '../services/geminiService';
import { Product, RecipeSuggestion } from '../types';
import { Search, ShoppingCart, Sparkles, X, ChefHat } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface LocalizedProduct extends Omit<Product, 'name' | 'description' | 'category'> {
  category: string;
  name: { en: string; fr: string };
  description: { en: string; fr: string };
}

// Mock Data with Translations
const MOCK_DATA: LocalizedProduct[] = [
  { 
    id: 1, 
    name: { en: 'Organic Bananas', fr: 'Bananes Bio' }, 
    category: 'Fruits', 
    price: 2.99, 
    freshness: 'High', 
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Sweet, organic bananas from Ecuador.', fr: 'Bananes douces et bio d\'Équateur.' } 
  },
  { 
    id: 2, 
    name: { en: 'Fresh Avocados', fr: 'Avocats Frais' }, 
    category: 'Vegetables', 
    price: 4.50, 
    freshness: 'Medium', 
    image: 'https://images.unsplash.com/photo-1523049673856-606ae93a9c9d?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Creamy Haas avocados perfect for toast.', fr: 'Avocats Haas crémeux parfaits pour les toasts.' } 
  },
  { 
    id: 3, 
    name: { en: 'Sourdough Bread', fr: 'Pain au Levain' }, 
    category: 'Bakery', 
    price: 6.00, 
    freshness: 'High', 
    image: 'https://images.unsplash.com/photo-1585478259525-716396c3a561?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Artisanal sourdough baked fresh daily.', fr: 'Pain au levain artisanal cuit chaque jour.' } 
  },
  { 
    id: 4, 
    name: { en: 'Whole Milk', fr: 'Lait Entier' }, 
    category: 'Dairy', 
    price: 3.20, 
    freshness: 'High', 
    image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Local farm fresh whole milk.', fr: 'Lait entier frais de la ferme locale.' } 
  },
  { 
    id: 5, 
    name: { en: 'Cherry Tomatoes', fr: 'Tomates Cerises' }, 
    category: 'Vegetables', 
    price: 3.99, 
    freshness: 'High', 
    image: 'https://images.unsplash.com/photo-1561136594-7f68413baa99?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Sweet and juicy vine-ripened tomatoes.', fr: 'Tomates douces et juteuses mûries sur vigne.' } 
  },
  { 
    id: 6, 
    name: { en: 'Italian Pasta', fr: 'Pâtes Italiennes' }, 
    category: 'Pantry', 
    price: 2.50, 
    freshness: 'Low', 
    image: 'https://images.unsplash.com/photo-1551462147-37885acc36f1?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Authentic durum wheat semolina pasta.', fr: 'Pâtes authentiques de semoule de blé dur.' } 
  },
  { 
    id: 7, 
    name: { en: 'Fresh Basil', fr: 'Basilic Frais' }, 
    category: 'Herbs', 
    price: 1.99, 
    freshness: 'High', 
    image: 'https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Aromatic fresh basil leaves.', fr: 'Feuilles de basilic frais aromatiques.' } 
  },
  { 
    id: 8, 
    name: { en: 'Olive Oil', fr: 'Huile d\'Olive' }, 
    category: 'Pantry', 
    price: 12.99, 
    freshness: 'Low', 
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&q=80&w=600', 
    description: { en: 'Cold pressed premium olive oil.', fr: 'Huile d\'olive premium pressée à froid.' } 
  },
];

export const Shop: React.FC = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [assistantQuery, setAssistantQuery] = useState('');
  const [suggestions, setSuggestions] = useState<RecipeSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const { t, language } = useLanguage();

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  const handleAskAssistant = async () => {
    if (!assistantQuery.trim()) return;
    setIsLoading(true);
    const results = await getSmartSuggestions(assistantQuery, language);
    setSuggestions(results);
    setIsLoading(false);
  };

  const categories = ['All', 'Fruits', 'Vegetables', 'Bakery', 'Dairy', 'Pantry'];

  // Transform localized data to standard Product format based on current language
  const currentProducts: Product[] = MOCK_DATA.map(p => ({
    ...p,
    name: p.name[language],
    description: p.description[language]
  }));
  
  const filteredProducts = currentProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header with Brand Blue Background */}
      <header className="sticky top-0 z-40 bg-brand-blue shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <Logo variant="light" className="scale-90 origin-left shrink-0" />
          
          <div className="hidden md:flex flex-1 max-w-xl mx-auto relative">
            <input
              type="text"
              placeholder={t.shop.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 text-white placeholder-white/60 focus:bg-white focus:text-gray-900 focus:border-brand-yellow focus:ring-0 rounded-xl transition-all outline-none"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
          </div>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <button className="relative p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white">
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-brand-yellow text-brand-blue text-[10px] font-extrabold w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                </span>
                )}
            </button>
          </div>
        </div>
        
        {/* Categories Scroll */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex gap-2 overflow-x-auto no-scrollbar border-t border-white/10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat 
                  ? 'bg-brand-yellow text-brand-blue shadow-md' 
                  : 'bg-transparent text-white hover:bg-white/10 border border-white/20'
              }`}
            >
              {t.shop.categories[cat as keyof typeof t.shop.categories] || cat}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* AI Assistant Teaser */}
        {!isAssistantOpen && (
          <button 
            onClick={() => setIsAssistantOpen(true)}
            className="w-full mb-8 bg-white border border-brand-blue/10 text-brand-blue p-6 rounded-2xl shadow-sm flex items-center justify-between group hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="bg-brand-blue/10 p-3 rounded-full">
                <Sparkles className="w-6 h-6 text-brand-blue" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-gray-900">{t.shop.aiTeaser.title}</h3>
                <p className="text-gray-500 text-sm">{t.shop.aiTeaser.subtitle}</p>
              </div>
            </div>
            <div className="bg-brand-blue text-white px-5 py-2 rounded-full font-bold text-sm group-hover:bg-brand-dark transition-colors">
              {t.shop.aiTeaser.button}
            </div>
          </button>
        )}

        {/* AI Assistant Expanded */}
        {isAssistantOpen && (
          <div className="mb-8 bg-white rounded-2xl shadow-xl border border-brand-blue/20 overflow-hidden animate-slide-up">
            <div className="bg-brand-blue p-4 flex justify-between items-center text-white">
              <div className="flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-brand-yellow" />
                <span className="font-bold font-serif tracking-wide">{t.shop.aiAssistant.title}</span>
              </div>
              <button onClick={() => setIsAssistantOpen(false)} className="hover:bg-white/20 p-1 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder={t.shop.aiAssistant.placeholder}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-blue outline-none"
                  value={assistantQuery}
                  onChange={(e) => setAssistantQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskAssistant()}
                />
                <button 
                  onClick={handleAskAssistant}
                  disabled={isLoading}
                  className="bg-brand-blue hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold transition-colors disabled:opacity-50"
                >
                  {isLoading ? t.shop.aiAssistant.thinking : t.shop.aiAssistant.ask}
                </button>
              </div>

              {suggestions.length > 0 && (
                <div className="grid md:grid-cols-3 gap-4">
                  {suggestions.map((recipe, idx) => (
                    <div key={idx} className="bg-blue-50 border border-blue-100 p-4 rounded-xl">
                      <h4 className="font-bold text-brand-blue mb-2">{recipe.recipeName}</h4>
                      <p className="text-sm text-gray-700 mb-3 leading-relaxed">{recipe.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {recipe.ingredients.map((ing, i) => (
                          <span key={i} className="text-[10px] bg-white text-brand-blue px-2 py-1 rounded-full border border-blue-100 font-medium">
                            {ing}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onAdd={handleAddToCart} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg">{t.shop.empty.message}</p>
            <button 
              onClick={() => {setSearchTerm(''); setActiveCategory('All');}} 
              className="mt-4 text-brand-blue font-bold hover:underline"
            >
              {t.shop.empty.action}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

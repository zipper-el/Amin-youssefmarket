
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/Logo';
import { LanguageSwitcher } from '../components/LanguageSwitcher';
import { ShoppingCart, Star, Truck, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-brand-blue flex flex-col overflow-x-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-brand-dark rounded-full opacity-20 blur-3xl"></div>
         <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-brand-yellow/10 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-20 pt-6 pb-6 px-4 flex justify-between items-center max-w-7xl mx-auto w-full animate-fade-in">
        <div className="w-20"></div> {/* Spacer for centering logic if needed, or just flex-between */}
        <Logo variant="light" className="scale-110 drop-shadow-xl" />
        <LanguageSwitcher />
      </header>

      {/* Main Content */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-4 pb-12 max-w-7xl mx-auto w-full">
        
        {/* Video Container */}
        <div className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden shadow-2xl border-[6px] border-white/10 animate-slide-up group">
          {/* Video Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/30 to-transparent z-10 pointer-events-none group-hover:bg-black/10 transition-colors duration-500"></div>
          
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
          >
            <source src="https://videos.pexels.com/video-files/2658247/2658247-hd_1920_1080_24fps.mp4" type="video/mp4" />
            <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop" alt="Supermarket Interior" className="w-full h-full object-cover" />
          </video>

          {/* Overlay Text inside Video */}
          <div className="absolute bottom-6 left-6 z-20 flex gap-3">
             <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border border-white/10">
                <span className="w-2 h-2 bg-brand-red rounded-full animate-pulse"></span>
                {t.home.live}
             </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-10 flex flex-col items-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white text-center mb-6 leading-tight">
             {t.home.heroTitle} <span className="text-brand-yellow">{t.home.heroHighlight}</span> {t.home.heroSuffix}
          </h2>
          
          <button 
            onClick={() => navigate('/shop')}
            className="group relative bg-brand-yellow text-brand-blue text-xl font-extrabold py-5 px-16 rounded-full shadow-[0_10px_40px_-10px_rgba(255,193,7,0.5)] hover:shadow-[0_20px_50px_-10px_rgba(255,193,7,0.7)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-4 overflow-hidden"
          >
            <span className="relative z-10">{t.home.shopNow}</span>
            <div className="relative z-10 bg-brand-blue text-brand-yellow p-1.5 rounded-full group-hover:translate-x-2 transition-transform">
                <ShoppingCart size={20} fill="currentColor" />
            </div>
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0"></div>
          </button>

          <p className="mt-6 text-brand-yellow/80 text-sm font-medium tracking-wide uppercase">
             {t.home.freeDelivery}
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-white">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                <div className="bg-brand-blue/50 p-3 rounded-full mb-3 text-brand-yellow shadow-inner">
                    <Star size={28} />
                </div>
                <h3 className="font-bold text-lg mb-1">{t.home.features.premium}</h3>
                <p className="text-white/60 text-sm">{t.home.features.premiumDesc}</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                <div className="bg-brand-blue/50 p-3 rounded-full mb-3 text-brand-yellow shadow-inner">
                    <Truck size={28} />
                </div>
                <h3 className="font-bold text-lg mb-1">{t.home.features.fast}</h3>
                <p className="text-white/60 text-sm">{t.home.features.fastDesc}</p>
            </div>
             <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center hover:bg-white/10 transition-colors">
                <div className="bg-brand-blue/50 p-3 rounded-full mb-3 text-brand-yellow shadow-inner">
                    <ShieldCheck size={28} />
                </div>
                <h3 className="font-bold text-lg mb-1">{t.home.features.prices}</h3>
                <p className="text-white/60 text-sm">{t.home.features.pricesDesc}</p>
            </div>
        </div>
      </main>
    </div>
  );
};

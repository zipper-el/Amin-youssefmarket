import React from 'react';

export const Logo: React.FC<{ className?: string; variant?: 'light' | 'dark' }> = ({ className, variant = 'dark' }) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-brand-blue';
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stylized Cart Icon */}
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" className="w-12 h-12 fill-brand-yellow">
            {/* Cart Basket transforming into Y */}
            <path d="M4 8h4l3 6h18l3-6h4v3h-2.5l-4 12h-18l-4-12h-2.5z" opacity="0.9" />
            {/* Speed lines / Y Accent */}
            <path d="M8 10 L14 25 L20 10" stroke="currentColor" strokeWidth="0" fill="#F59E0B" />
        </svg>
        {/* Red Wheels */}
        <div className="absolute bottom-1 left-2 w-3 h-3 bg-brand-red rounded-full shadow-sm"></div>
        <div className="absolute bottom-1 right-3 w-3 h-3 bg-brand-red rounded-full shadow-sm"></div>
      </div>
      
      <div className="flex flex-col justify-center">
        <h1 className={`font-sans text-2xl font-extrabold tracking-tight leading-none ${textColor}`}>
          Youssef
        </h1>
        <span className="text-sm font-bold uppercase tracking-[0.2em] text-brand-yellow leading-none mt-0.5">
          Market
        </span>
      </div>
    </div>
  );
};

import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'fr';

interface Translations {
  home: {
    heroTitle: string;
    heroHighlight: string;
    heroSuffix: string;
    shopNow: string;
    freeDelivery: string;
    live: string;
    features: {
      premium: string;
      premiumDesc: string;
      fast: string;
      fastDesc: string;
      prices: string;
      pricesDesc: string;
    };
  };
  shop: {
    searchPlaceholder: string;
    cart: string;
    categories: {
      All: string;
      Fruits: string;
      Vegetables: string;
      Bakery: string;
      Dairy: string;
      Pantry: string;
      Herbs: string;
    };
    aiTeaser: {
      title: string;
      subtitle: string;
      button: string;
    };
    aiAssistant: {
      title: string;
      placeholder: string;
      button: string;
      thinking: string;
      ask: string;
    };
    product: {
      fresh: string;
      addToCart: string;
      currency: string;
    };
    empty: {
      message: string;
      action: string;
    };
  };
}

const translations: Record<Language, Translations> = {
  en: {
    home: {
      heroTitle: "Freshness",
      heroHighlight: "Delivered",
      heroSuffix: "to Your Door",
      shopNow: "SHOP NOW",
      freeDelivery: "Free Delivery on First Order",
      live: "Live",
      features: {
        premium: "Premium Selection",
        premiumDesc: "Hand-picked fresh products daily.",
        fast: "Fast Delivery",
        fastDesc: "From our shelves to your home.",
        prices: "Best Prices",
        pricesDesc: "Quality affordable for everyone.",
      },
    },
    shop: {
      searchPlaceholder: "Search fresh products...",
      cart: "Cart",
      categories: {
        All: "All",
        Fruits: "Fruits",
        Vegetables: "Vegetables",
        Bakery: "Bakery",
        Dairy: "Dairy",
        Pantry: "Pantry",
        Herbs: "Herbs",
      },
      aiTeaser: {
        title: "Need recipe ideas?",
        subtitle: "Ask Chef Youssef for help with ingredients.",
        button: "Try AI Chef",
      },
      aiAssistant: {
        title: "Chef Youssef AI",
        placeholder: "e.g., Vegetarian dinner with pasta...",
        button: "Ask",
        thinking: "Thinking...",
        ask: "Ask",
      },
      product: {
        fresh: "Fresh",
        addToCart: "Add to Cart",
        currency: "$",
      },
      empty: {
        message: "No products found matching your criteria.",
        action: "View all products",
      },
    },
  },
  fr: {
    home: {
      heroTitle: "Fraîcheur",
      heroHighlight: "Livrée",
      heroSuffix: "à Votre Porte",
      shopNow: "ACHETER MAINTENANT",
      freeDelivery: "Livraison Gratuite sur la Première Commande",
      live: "En Direct",
      features: {
        premium: "Sélection Premium",
        premiumDesc: "Produits frais sélectionnés quotidiennement.",
        fast: "Livraison Rapide",
        fastDesc: "De nos rayons à chez vous.",
        prices: "Meilleurs Prix",
        pricesDesc: "La qualité abordable pour tous.",
      },
    },
    shop: {
      searchPlaceholder: "Rechercher des produits...",
      cart: "Panier",
      categories: {
        All: "Tout",
        Fruits: "Fruits",
        Vegetables: "Légumes",
        Bakery: "Boulangerie",
        Dairy: "Laitiers",
        Pantry: "Épicerie",
        Herbs: "Herbes",
      },
      aiTeaser: {
        title: "Besoin d'idées de recettes ?",
        subtitle: "Demandez à Chef Youssef de l'aide.",
        button: "Essayer Chef IA",
      },
      aiAssistant: {
        title: "Chef Youssef IA",
        placeholder: "ex: Dîner végétarien avec des pâtes...",
        button: "Demander",
        thinking: "Réflexion...",
        ask: "Demander",
      },
      product: {
        fresh: "Frais",
        addToCart: "Ajouter",
        currency: "€",
      },
      empty: {
        message: "Aucun produit trouvé selon vos critères.",
        action: "Voir tous les produits",
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translations[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

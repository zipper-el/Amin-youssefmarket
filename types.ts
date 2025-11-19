export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  freshness: 'High' | 'Medium' | 'Low';
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface RecipeSuggestion {
  recipeName: string;
  description: string;
  ingredients: string[];
}

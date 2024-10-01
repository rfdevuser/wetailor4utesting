import { ADD_TO_CART, REMOVE_FROM_CART, LOAD_CART } from '@/redux/actions/cartActions';

export interface CartItem {
  name: string;
  price: number;
  image: string;
  RegPrice:string;
  slug: string;
  pid: string;
}

export interface CartState {
  items: CartItem[];
}

// Load initial state from local storage
const loadCartFromLocalStorage = (): CartItem[] => {
  if (typeof window !== 'undefined') {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

const initialCartState: CartState = {
  items: loadCartFromLocalStorage(),
};

const cartReducer = (state = initialCartState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.filter((_, index) => index !== action.payload),
      };
    case LOAD_CART:
      return {
        ...state,
        items: action.payload,
      };
    default:
      return state;
  }
};

export default cartReducer;

// redux/actions/cartActions.ts

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const LOAD_CART = 'LOAD_CART';

export interface CartItem {
  name: string;
  price: number;
  image: string;
  RegPrice: string;
  slug: string;
  pid: string;
}

export const addToCart = (item: CartItem) => {
  const updatedCart = JSON.parse(localStorage.getItem('cart') || '[]');
  updatedCart.push(item);
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  return {
    type: ADD_TO_CART,
    payload: item,
  };
};

export const removeFromCart = (index: number) => {
  const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
  const updatedCart = currentCart.filter((_: any, i: number) => i !== index);
  localStorage.setItem('cart', JSON.stringify(updatedCart));

  return {
    type: REMOVE_FROM_CART,
    payload: index,
  };
};

export const loadCart = (items: CartItem[]) => {
  return {
    type: LOAD_CART,
    payload: items,
  };
};


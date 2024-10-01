// src/types/index.ts

export interface CartItem {
    id: number;
    productName: string;
    productPrice: number;
    sleevesName?: string;
    sleevesPrice?: number;
    detailsName?: string;
    detailsPrice?: number;
    extraName?: string;
    extraPrice?: number;
    mainFabricName?: string;
    mainFabricPrice?: number;
    liningFabricName?: string;
    liningFabricPrice?: number;
    totalPrice: number;
    image?: string;
    productID: string; // Assuming this is a string; adjust if it's a different type
  }
  
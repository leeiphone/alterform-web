import { create } from 'zustand';
import { Product, CartItem, AxisKey, OrderDetails } from '../types';

interface AppState {
  // Navigation / View
  currentSection: 'hero' | 'axes' | 'case' | 'shop';
  selectedAxis: AxisKey;
  setSelectedAxis: (axis: AxisKey) => void;
  setCurrentSection: (section: 'hero' | 'axes' | 'case' | 'shop') => void;

  // Selected Product for Detail Modal
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product, size: number, selectedMaterial: string, quantity?: number) => void;
  removeFromCart: (productId: string, size: number, selectedMaterial: string) => void;
  updateQuantity: (productId: string, size: number, selectedMaterial: string, quantity: number) => void;
  clearCart: () => void;

  // Checkout
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastOrder: OrderDetails | null;
  setLastOrder: (order: OrderDetails | null) => void;
}

export const useStore = create<AppState>((set) => ({
  currentSection: 'hero',
  selectedAxis: 'FLUID',
  setSelectedAxis: (axis) => set({ selectedAxis: axis }),
  setCurrentSection: (section) => set({ currentSection: section }),

  selectedProduct: null,
  setSelectedProduct: (product) => set({ selectedProduct: product }),

  cart: [],
  isCartOpen: false,
  setIsCartOpen: (open) => set({ isCartOpen: open }),

  addToCart: (product, size, selectedMaterial, quantity = 1) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === size &&
          item.selectedMaterial === selectedMaterial
      );

      if (existingIndex > -1) {
        const updated = [...state.cart];
        updated[existingIndex].quantity += quantity;
        return { cart: updated, isCartOpen: true };
      }

      return {
        cart: [...state.cart, { product, size, selectedMaterial, quantity }],
        isCartOpen: true,
      };
    }),

  removeFromCart: (productId, size, selectedMaterial) =>
    set((state) => ({
      cart: state.cart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.size === size &&
            item.selectedMaterial === selectedMaterial
          )
      ),
    })),

  updateQuantity: (productId, size, selectedMaterial, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (
          item.product.id === productId &&
          item.size === size &&
          item.selectedMaterial === selectedMaterial
        ) {
          return { ...item, quantity: Math.max(1, quantity) };
        }
        return item;
      }),
    })),

  clearCart: () => set({ cart: [] }),

  isCheckoutOpen: false,
  setIsCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
  lastOrder: null,
  setLastOrder: (order) => set({ lastOrder: order }),
}));

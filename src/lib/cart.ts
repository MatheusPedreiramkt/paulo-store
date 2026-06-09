"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { calcCartItemSubtotal } from "@/lib/utils";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  promoQty?: number;
  promoPrice?: number;
  promoLabel?: string;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: Omit<CartItem, "id">) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  total: () => number;
  itemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.size === item.size &&
            i.color === item.color
        );
        if (existing) {
          set((s) => ({
            items: s.items.map((i) =>
              i.id === existing.id
                ? {
                    ...i,
                    price: item.price,
                    promoQty: item.promoQty,
                    promoPrice: item.promoPrice,
                    promoLabel: item.promoLabel,
                    quantity: i.quantity + item.quantity,
                  }
                : i
            ),
          }));
        } else {
          const id = `${item.productId}-${item.size ?? ""}-${item.color ?? ""}-${Date.now()}`;
          set((s) => ({ items: [...s.items, { ...item, id }] }));
        }
        set({ isOpen: true });
      },

      removeItem: (id) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== id) })),

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set((s) => ({
          items: s.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        }));
      },

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      total: () =>
        get().items.reduce((acc, i) => acc + calcCartItemSubtotal(i), 0),

      itemCount: () =>
        get().items.reduce((acc, i) => acc + i.quantity, 0),
    }),
    {
      name: "paulo-store-cart",
    }
  )
);

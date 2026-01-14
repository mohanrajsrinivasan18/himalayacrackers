import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: product =>
        set(state => {
          const existing = state.items.find(i => i.id === product.id);

          if (existing) {
            return {
              items: state.items.map(i =>
                i.id === product.id
                  ? { ...i, qty: i.qty + 1 }
                  : i
              )
            };
          }

          return {
            items: [...state.items, { ...product, qty: 1 }]
          };
        }),

      updateQty: (id, qty) =>
        set(state => ({
          items:
            qty <= 0
              ? state.items.filter(i => i.id !== id)
              : state.items.map(i =>
                  i.id === id ? { ...i, qty } : i
                )
        })),

      removeItem: id =>
        set(state => ({
          items: state.items.filter(i => i.id !== id)
        })),

      /* ✅ REQUIRED BY QtyControl */
      getQty: id =>
        get().items.find(i => i.id === id)?.qty || 0,

      total: () =>
        get().items.reduce(
          (sum, i) => sum + i.price * i.qty,
          0
        ),

      count: () =>
        get().items.reduce((sum, i) => sum + i.qty, 0),

      productCount: () =>
        get().items.length,

      clear: () => set({ items: [] })
    }),
    {
      name: "cart-storage"
    }
  )
);

export default useCartStore;

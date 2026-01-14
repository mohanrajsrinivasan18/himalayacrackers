import useCartStore from "./cartStore";

export const useCartItems = () =>
  useCartStore(state => state.items);

export const useCartAdd = () =>
  useCartStore(state => state.addItem);

export const useCartUpdateQty = () =>
  useCartStore(state => state.updateQty);

export const useCartRemove = () =>
  useCartStore(state => state.removeItem);

export const useCartTotal = () =>
  useCartStore(state => state.total);

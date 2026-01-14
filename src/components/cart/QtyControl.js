import { useState, useEffect } from "react";
import useCartStore from "@/store/cartStore";
import styles from "./QtyControl.module.scss";
import { useHydration } from "@/hooks/useHydration";

export default function QtyControl({ product }) {
  const isHydrated = useHydration();
  
  const qty = useCartStore(s => s.getQty(product.id));
  const addItem = useCartStore(s => s.addItem);
  const updateQty = useCartStore(s => s.updateQty);
  const removeItem = useCartStore(s => s.removeItem);

  // Show consistent state until hydrated
  const displayQty = isHydrated ? qty : 0;

  if (displayQty === 0) {
    return (
      <button
        className={styles.add}
        onClick={() => addItem(product)}
        disabled={!isHydrated}
      >
        Add
      </button>
    );
  }

  return (
    <div className={styles.control}>
      <button
        onClick={() =>
          displayQty === 1
            ? removeItem(product.id)
            : updateQty(product.id, displayQty - 1)
        }
        disabled={!isHydrated}
      >
        −
      </button>

      <span>{displayQty}</span>

      <button
        onClick={() =>
          updateQty(product.id, displayQty + 1)
        }
        disabled={!isHydrated}
      >
        +
      </button>
    </div>
  );
}

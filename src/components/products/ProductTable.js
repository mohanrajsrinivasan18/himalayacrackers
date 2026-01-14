import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import { useState, useEffect } from "react";
import styles from "./ProductTable.module.scss";

export default function ProductTable({ products }) {
  const isHydrated = useHydration();
  const [isMobile, setIsMobile] = useState(false);
  
  const items = useCartStore(state => state.items);
  const addItem = useCartStore(state => state.addItem);
  const updateQty = useCartStore(state => state.updateQty);
  const removeItem = useCartStore(state => state.removeItem);

  // Check if screen is mobile (below 640px)
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Helper to get qty for a product - show 0 until hydrated
  const getQty = productId => {
    if (!isHydrated) return 0;
    return items.find(i => i.id === productId)?.qty || 0;
  };

  const handleMobileQtyChange = (product, value) => {
    // Only allow numbers
    if (value !== '' && !/^\d+$/.test(value)) {
      return;
    }
    
    const qty = value === '' ? 0 : parseInt(value);
    
    if (qty === 0) {
      removeItem(product.id);
    } else if (getQty(product.id) === 0) {
      // Add item if it doesn't exist
      addItem({ ...product, qty: qty });
      setTimeout(() => updateQty(product.id, qty), 0);
    } else {
      updateQty(product.id, qty);
    }
  };

  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product</th>
            <th>Per</th>
            <th>MRP</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>

        <tbody>
          {products.map(p => {
            const qty = getQty(p.id);

            return (
              <tr key={p.id}>
                <td className={styles.productCell}>
                  <img
                    src={
                      p.image && p.image.trim() !== ""
                        ? p.image
                        : "/images/product-placeholder.svg"
                    }
                    alt={p.name}
                    className={styles.thumb}
                    loading="lazy"
                    onError={e => {
                      e.currentTarget.src =
                        "/images/product-placeholder.svg";
                    }}
                  />

                  <span>{p.name}</span>
                </td>

                <td className={styles.per}>{p.per || 'pkt'}</td>
                <td className={styles.mrp}>₹{p.mrp}</td>
                <td className={styles.price}>₹{p.price}</td>

                {/* QTY - Fifth Column */}
                <td>
                  {isMobile ? (
                    // Mobile: Show editable input
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      className={styles.mobileQtyInput}
                      value={qty || ''}
                      onChange={(e) => handleMobileQtyChange(p, e.target.value)}
                      disabled={!isHydrated}
                      placeholder="0"
                    />
                  ) : (
                    // Desktop: Show full controls
                    qty === 0 ? (
                      <button
                        className={styles.addBtn}
                        onClick={() => addItem(p)}
                      >
                        Add
                      </button>
                    ) : (
                      <div className={styles.qty}>
                        <button
                          onClick={() =>
                            qty === 1
                              ? removeItem(p.id)
                              : updateQty(p.id, qty - 1)
                          }
                        >
                          −
                        </button>

                        <span>{qty}</span>

                        <button
                          onClick={() =>
                            updateQty(p.id, qty + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    )
                  )}
                </td>

                <td className={styles.total}>
                  ₹{qty * p.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

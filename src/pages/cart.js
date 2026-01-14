import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./CartPage.module.scss";

export default function CartPage() {
  const isHydrated = useHydration();
  
  const items = useCartStore(state => state.items);
  const updateQty = useCartStore(state => state.updateQty);
  const removeItem = useCartStore(state => state.removeItem);
  const total = useCartStore(state => state.total);
  const count = useCartStore(state => state.count);

  // Show consistent state until hydrated
  const displayItems = isHydrated ? items : [];
  const displayTotal = isHydrated ? total() : 0;
  const displayCount = isHydrated ? count() : 0;

  return (
    <>
      <Header />

      <main className={styles.page}>
        <div className={styles.header}>
          <h1>Review Your Cart</h1>
          <p>Review your selected items before sending enquiry</p>
        </div>

        {displayItems.length === 0 ? (
          <div className={styles.empty}>
            <h2>Your cart is empty</h2>
            <p>Add some crackers to your cart to continue</p>
            <Link href="/#products" className={styles.shopBtn}>
              Browse Crackers
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            {/* CART ITEMS */}
            <div className={styles.items}>
              <div className={styles.itemsHeader}>
                <h2>Selected Items ({displayCount} items)</h2>
              </div>
              
              <div className={styles.itemsList}>
                {displayItems.map(item => (
                  <div key={item.id} className={styles.item}>
                    <div className={styles.itemImage}>
                      <img
                        src={item.image || "/images/product-placeholder.svg"}
                        alt={item.name}
                        onError={e => {
                          e.currentTarget.src = "/images/product-placeholder.svg";
                        }}
                      />
                    </div>

                    <div className={styles.info}>
                      <h3 title={item.name}>{item.name}</h3>
                      <p className={styles.price}>₹{item.price}</p>
                    </div>

                    <div className={styles.qtyControl}>
                      <button
                        onClick={() =>
                          updateQty(item.id, item.qty - 1)
                        }
                        disabled={item.qty <= 1 || !isHydrated}
                        className={styles.qtyBtn}
                      >
                        −
                      </button>
                      <span className={styles.qty}>{item.qty}</span>
                      <button
                        onClick={() =>
                          updateQty(item.id, item.qty + 1)
                        }
                        disabled={!isHydrated}
                        className={styles.qtyBtn}
                      >
                        +
                      </button>
                    </div>

                    <div className={styles.actions}>
                      <p className={styles.subtotal}>
                        ₹{item.price * item.qty}
                      </p>
                      <button
                        className={styles.remove}
                        onClick={() => removeItem(item.id)}
                        disabled={!isHydrated}
                        title="Remove item"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <aside className={styles.summary}>
              <h2>Order Summary</h2>

              <div className={styles.summaryDetails}>
                <div className={styles.row}>
                  <span>Total Items</span>
                  <span>{displayCount} pieces</span>
                </div>

                <div className={styles.row}>
                  <span>Product Types</span>
                  <span>{displayItems.length} different</span>
                </div>

                <div className={styles.totalRow}>
                  <span>Total Amount</span>
                  <strong>₹{displayTotal}</strong>
                </div>
              </div>

              <div className={styles.notice}>
                <h3>📋 Next Step</h3>
                <p>
                  Review your items above, then proceed to send enquiry with your contact details. 
                  We'll confirm your order via WhatsApp or phone call.
                </p>
              </div>

              <div className={styles.ctaActions}>
                <Link href="/#products" className={styles.continueBtn}>
                  Add More Items
                </Link>
                <Link href="/enquiry" className={styles.enquiryBtn}>
                  Send Enquiry →
                </Link>
              </div>

              <p className={styles.note}>
                💡 Online payments not accepted as per Tamil Nadu regulations
              </p>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
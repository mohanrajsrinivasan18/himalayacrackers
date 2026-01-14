import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useCartStore from "@/store/cartStore";
import styles from "./StickyCartBar.module.scss";
import { useHydration } from "@/hooks/useHydration";

export default function StickyCartBar() {
  const isHydrated = useHydration();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const barRef = useRef(null);
  
  const productCount = useCartStore(s => s.productCount());
  const itemCount = useCartStore(s => s.count());
  const totalAmount = useCartStore(s => s.total());
  const items = useCartStore(s => s.items);

  // Handle scroll to hide/show bar
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down - hide bar
        setIsVisible(false);
        setIsExpanded(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up - show bar
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Handle click outside to collapse
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (barRef.current && !barRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  // Don't render anything until hydrated or if cart is empty
  if (!isHydrated || itemCount === 0) return null;

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div 
      ref={barRef}
      className={`${styles.bar} ${isExpanded ? styles.expanded : ""} ${!isVisible ? styles.hidden : ""}`}
    >
      {/* Collapsed View */}
      <div className={styles.collapsed} onClick={toggleExpanded}>
        <div className={styles.info}>
          <div className={styles.cartIcon}>
            🛒
            <span className={styles.badge}>{itemCount}</span>
          </div>
          <div className={styles.details}>
            <span className={styles.count}>
              {itemCount} items • {productCount} types
            </span>
            <span className={styles.total}>₹{totalAmount}</span>
          </div>
        </div>
        <button className={styles.expandBtn}>
          {isExpanded ? "▼" : "▲"}
        </button>
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.itemsList}>
            {items.slice(0, 5).map(item => (
              <div key={item.id} className={styles.quickItem}>
                <span className={styles.itemName} title={item.name}>
                  {item.name}
                </span>
                <span className={styles.itemQty}>×{item.qty}</span>
                <span className={styles.itemPrice}>₹{item.price * item.qty}</span>
              </div>
            ))}
            {items.length > 5 && (
              <div className={styles.moreItems}>
                +{items.length - 5} more items
              </div>
            )}
          </div>
          
          <div className={styles.actions}>
            <Link 
              href="/cart" 
              className={styles.viewCart}
              onClick={() => setIsExpanded(false)}
            >
              View Full Cart
            </Link>
            <Link 
              href="/enquiry" 
              className={styles.quickEnquiry}
              onClick={() => setIsExpanded(false)}
            >
              Quick Enquiry
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

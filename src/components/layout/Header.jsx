import Link from "next/link";
import { useState } from "react";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./Header.module.scss";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isHydrated = useHydration();
  
  const itemCount = useCartStore(s => s.count());
  const productCount = useCartStore(s => s.items.length);
  const total = useCartStore(s => s.total());

  // Show 0 values until hydrated to prevent mismatch
  const displayItemCount = isHydrated ? itemCount : 0;
  const displayProductCount = isHydrated ? productCount : 0;
  const displayTotal = isHydrated ? total : 0;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>
            <span className={styles.brand}>Himalaya</span>
            <span className={styles.subBrand}>Crackers</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/products">Products</Link>
          <Link href="/safety">Safety Tips</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className={styles.rightSection}>
          <Link href="/cart" className={styles.cart}>
            <svg className={styles.cartIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 2L7 6H3C2.44772 6 2 6.44772 2 7V19C2 19.5523 2.44772 20 3 20H21C21.5523 20 22 19.5523 22 19V7C22 6.44772 21.5523 6 21 6H17L15 2H9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <path d="M15 11V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {displayItemCount > 0 && (
              <span className={styles.badge}>{displayItemCount}</span>
            )}
            <div className={styles.cartInfo}>
              <span className={styles.cartTotal}>₹{displayTotal.toLocaleString()}</span>
            </div>
          </Link>

          <button 
            className={styles.hamburger}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
            <span className={mobileMenuOpen ? styles.open : ''}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          <div 
            className={styles.overlay}
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className={styles.mobileNav}>
            <Link 
              href="/products"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/safety"
              onClick={() => setMobileMenuOpen(false)}
            >
              Safety Tips
            </Link>
            <Link 
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link 
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className={styles.mobileCart}
            >
              Cart ({displayItemCount}) - ₹{displayTotal.toLocaleString()}
            </Link>
          </nav>
        </>
      )}
    </header>
  );
}

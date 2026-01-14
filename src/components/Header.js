import Link from "next/link";
import { useState, useEffect } from "react";
import useCartStore from "@/store/cartStore";
import styles from "./Header.module.scss";

import Link from "next/link";
import { useState, useEffect } from "react";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./Header.module.scss";

export default function Header() {
  const isHydrated = useHydration();
  
  const itemCount = useCartStore(s => s.count());
  const productCount = useCartStore(s => s.productCount());
  const total = useCartStore(s => s.total());

  // Show 0 values until hydrated to prevent mismatch
  const displayItemCount = isHydrated ? itemCount : 0;
  const displayProductCount = isHydrated ? productCount : 0;
  const displayTotal = isHydrated ? total : 0;

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          Himalaya Crackers
        </Link>

        <nav className={styles.nav}>
          <Link href="/products">Products</Link>

          <Link href="/cart" className={styles.cart}>
            <span className={styles.icon}>🛒</span>
            <span className={styles.meta}>
              {displayProductCount} products {displayItemCount} items | ₹{displayTotal}
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

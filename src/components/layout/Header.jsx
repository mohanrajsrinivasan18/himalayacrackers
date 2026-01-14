import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./Header.module.scss";

export default function Header() {
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
          <span className={styles.brand}>Himalaya</span>
          <span className={styles.subBrand}>Crackers</span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/products">Products</Link>
          <Link href="/about">About Us</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <Link href="/cart" className={styles.cart}>
          <span className={styles.cartIcon}>🛒</span>
          <div className={styles.cartInfo}>
            <span className={styles.count}>{displayItemCount} items</span>
            <span className={styles.total}>₹{displayTotal}</span>
          </div>
        </Link>
      </div>
    </header>
  );
}

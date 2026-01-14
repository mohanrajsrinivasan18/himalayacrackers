import Link from "next/link";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./StickyCartBar.module.scss";

export default function StickyCartBar() {
  const isHydrated = useHydration();
  
  const count = useCartStore(s => s.count());
  const total = useCartStore(s => s.total());

  // Show consistent state until hydrated
  const displayCount = isHydrated ? count : 0;
  const displayTotal = isHydrated ? total() : 0;

  if (displayCount === 0) return null;

  return (
    <Link href="/cart" className={styles.bar}>
      🛒 {displayCount} items • ₹{displayTotal} — View Cart →
    </Link>
  );
}

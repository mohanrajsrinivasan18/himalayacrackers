import { calculateFinalPrice } from "@/lib/pricing";
import QtyControl from "@/components/cart/QtyControl";
import { useState, useEffect } from "react";
import styles from "./ProductCard.module.scss";

export default function ProductCard({ product, compact = false }) {
  const { finalPrice, discount } = calculateFinalPrice(product);
  const [badgeType, setBadgeType] = useState(null);

  useEffect(() => {
    const badges = [];
    if (discount >= 50) badges.push({ type: "offer", value: `${discount}% OFF` });
    if (Math.random() > 0.7) badges.push({ type: "new", value: "NEW" });
    if (Math.random() > 0.6) badges.push({ type: "trending", value: "TRENDING" });
    
    if (badges.length > 0) {
      setBadgeType(badges[Math.floor(Math.random() * badges.length)]);
    } else if (discount > 0) {
      setBadgeType({ type: "offer", value: `${discount}% OFF` });
    }
  }, [discount]);

  const imageSrc = product.image && product.image.trim() !== ""
    ? product.image
    : "/images/product-placeholder.svg";

  return (
    <div className={`${styles.card} ${compact ? styles.compact : ""}`}>
      <div className={styles.imageContainer}>
        <img
          src={imageSrc}
          alt={product.name}
          className={styles.image}
          onError={e => {
            e.currentTarget.src = "/images/product-placeholder.svg";
          }}
          loading="lazy"
        />
        {badgeType && (
          <span className={`${styles.badge} ${styles[badgeType.type]}`}>
            {badgeType.value}
          </span>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={styles.name} title={product.name}>
          {product.name}
        </h3>
        
        <div className={styles.priceRow}>
          <div className={styles.priceGroup}>
            <strong className={styles.price}>₹{finalPrice}</strong>
            <span className={styles.per}>/{product.per || 'pkt'}</span>
          </div>
          {discount > 0 && (
            <span className={styles.mrp}>₹{product.mrp}</span>
          )}
        </div>

        <QtyControl
          product={{
            ...product,
            price: finalPrice
          }}
          compact={compact}
        />
      </div>
    </div>
  );
}
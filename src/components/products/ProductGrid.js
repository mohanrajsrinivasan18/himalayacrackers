import ProductCard from "@/components/products/ProductCard";
import styles from "./ProductGrid.module.scss";

export default function ProductGrid({ products }) {
  if (!products.length) {
    return <p style={{ padding: 16 }}>No products found.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
}

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import useCartStore from "@/store/cartStore";
import styles from "./ProductDetail.module.scss";

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const addItem = useCartStore(state => state.addItem);

  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;

    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(setProduct);
  }, [id]);

  if (!product) return null;

  return (
    <>
      <SEO title={`${product.name} | Himalaya Crackers`} />

      <Header />

      <main className={styles.page}>
        <div className={styles.layout}>
          <img src={product.image} alt={product.name} />

          <div>
            <h1>{product.name}</h1>
            <p className={styles.price}>₹{product.price}</p>

            <button className={styles.addButton} onClick={() => addItem(product, 1)}>
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

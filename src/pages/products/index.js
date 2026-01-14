import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import ScrollProgress from "@/components/layout/ScrollProgress";
import SEO from "@/components/SEO";
import styles from "./ProductsPage.module.scss";

export default function ProductsPage() {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products/list");
        const data = await res.json();

        if (category) {
          const filtered = data.filter(p =>
            p.category_slug === category
          );
          setProducts(filtered);
          // For single category, group is just that category
          setGroupedProducts({ [category]: filtered });
        } else {
          setProducts(data);
          // Group all products by category
          const grouped = data.reduce((acc, product) => {
            const cat = product.category_slug || 'uncategorized';
            if (!acc[cat]) acc[cat] = [];
            acc[cat].push(product);
            return acc;
          }, {});
          console.log('Grouped products:', grouped);
          setGroupedProducts(grouped);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, [category]);

  const title = category
    ? category.replace("-", " ").toUpperCase()
    : "All Crackers";

  return (
    <>
      <SEO title={`${title} | Himalaya Crackers`} />

      <Header />

      <main className={styles.page}>
        <header className={styles.header}>
          {category && (
            <div className={styles.filters}>
              <span className={styles.chip}>
                {category.replace("-", " ")}
                <button onClick={() => router.push("/products")}>×</button>
              </span>
            </div>
          )}
          <h1>{title}</h1>
          <p>
            Browse premium Sivakasi crackers.
            Add items to cart and send enquiry for best pricing.
          </p>
        </header>

        {loading ? (
          <div className={styles.loading}>Loading products…</div>
        ) : products.length === 0 ? (
          <div className={styles.loading}>
            No products found in this category.
          </div>
        ) : (
          <div>
            {Object.entries(groupedProducts).map(([categorySlug, categoryProducts]) => (
              <div key={categorySlug} className={styles.categorySection}>
                <h2 className={styles.categoryHeader}>
                  {categorySlug.replace('-', ' ').toUpperCase()} ({categoryProducts.length})
                </h2>
                <ProductGrid products={categoryProducts} />
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
      <ScrollProgress />
    </>
  );
}

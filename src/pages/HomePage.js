import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import ProductExplorer from "@/components/products/ProductExplorer";
import styles from "./HomePage.module.scss";

import ScrollProgress from "@/components/layout/ScrollProgress";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/products/list");
        const data = await res.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  return (
    <>
      <SEO
        title="Himalaya Crackers | Premium Sivakasi Crackers"
        description="Buy premium Sivakasi crackers for retail and bulk orders. Safe packing, best prices, enquiry-based ordering."
      />
      {/* Supreme Court Notice Banner */}
      <div className={styles.noticeBanner}>
        <div className={styles.noticeContent}>
          <span className={styles.noticeIcon}>⚠️</span>
          <p>
            As per 2018 supreme court order, online sale of firecrackers are not permitted! 
            We request you to add your products to the cart and submit the required crackers through the enquiry button. 
            We will contact you within 24 hrs and confirm the order through WhatsApp or phone call.
          </p>
        </div>
      </div>

      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            
            {/* Single Hero Image - Full Width */}
            <div className={styles.heroImageContainer}>
              <img src="/images/Hero_2.jpg" alt="Premium Sivakasi Crackers Collection" />
            </div>

            {/* Trust Indicators */}
            <div className={styles.trustIndicators}>
              <div className={styles.trustBox}>
                <div className={styles.trustIcon}>🏆</div>
                <div className={styles.trustText}>
                  <strong>Licensed Dealer</strong>
                  <span>Certified & Authorized</span>
                </div>
              </div>
              
              <div className={styles.trustBox}>
                <div className={styles.trustIcon}>🚚</div>
                <div className={styles.trustText}>
                  <strong>Safe Delivery</strong>
                  <span>Across Tamil Nadu</span>
                </div>
              </div>
              
              <div className={styles.trustBox}>
                <div className={styles.trustIcon}>⚡</div>
                <div className={styles.trustText}>
                  <strong>Quick Service</strong>
                  <span>Same Day Processing</span>
                </div>
              </div>
              
              <div className={styles.trustBox}>
                <div className={styles.trustIcon}>💯</div>
                <div className={styles.trustText}>
                  <strong>10K+ Customers</strong>
                  <span>Trusted Since 2008</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActions}>
              <a href="#products" className={styles.shopBtn}>
                🎆 Shop Crackers
              </a>
              <a href="tel:+919788233556" className={styles.callBtn}>
                📞 Call: +91 97882 33556
              </a>
            </div>

          </div>
        </section>

        {/* Products Section */}
        <section id="products" className={styles.products}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2>Our Premium Collection</h2>
              <p>Explore our wide range of quality crackers for every celebration</p>
            </div>
            <ProductExplorer products={products} />
          </div>
        </section>
      </main>

      <Footer />
      <ScrollProgress />
    </>
  );
}
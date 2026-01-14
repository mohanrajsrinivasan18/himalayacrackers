import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import styles from "./about.module.scss";

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Us | Himalaya Crackers"
        description="Learn about Himalaya Crackers - Premium Sivakasi crackers supplier for wholesale and retail sales across Tamil Nadu and India."
      />

      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>About Himalaya Crackers</h1>
            <p>Your trusted partner for premium Sivakasi crackers since years</p>
          </div>
        </section>

        {/* About Content */}
        <section className={styles.about}>
          <div className={styles.container}>
            <div className={styles.content}>
              <div className={styles.story}>
                <h2>Our Story</h2>
                <p>
                  Himalaya Crackers shop for wholesale and retail sales in Sivakasi has a strong base in supplying 
                  crackers, fancy / pyrotech items and gift boxes for whole Tamil Nadu and other states throughout 
                  the year for all festivals, functions and celebrations.
                </p>
                <p>
                  We have built our reputation on quality, safety, and customer satisfaction. Our extensive range 
                  of products caters to every celebration need, from traditional festivals to modern celebrations.
                </p>
              </div>

              <div className={styles.features}>
                <h2>Why Choose Us?</h2>
                <div className={styles.featuresGrid}>
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>🏭</div>
                    <h3>Factory Direct</h3>
                    <p>Direct sourcing from Sivakasi manufacturers ensures best quality and prices</p>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>📦</div>
                    <h3>Safe Packing</h3>
                    <p>Water-proof, scratch-proof & sanitized packaging for secure delivery</p>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>🚚</div>
                    <h3>Wide Delivery</h3>
                    <p>Serving Tamil Nadu, Pondicherry, Bangalore and other states</p>
                  </div>
                  
                  <div className={styles.feature}>
                    <div className={styles.featureIcon}>👥</div>
                    <h3>Trusted by 10,000+</h3>
                    <p>Thousands of satisfied customers across India trust our quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import styles from "./policies.module.scss";

export default function OurUpdatesPage() {
  return (
    <>
      <SEO
        title="Our Updates | Himalaya Crackers"
        description="Important updates and policies for ordering crackers from Himalaya Crackers. Stay informed about our latest guidelines."
      />

      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Our Important Updates</h1>
            <p>Stay informed about our latest policies and guidelines for a smooth ordering experience</p>
          </div>

          <div className={styles.content}>
            <div className={styles.updatesGrid}>
              <div className={styles.updateCard}>
                <div className={styles.updateIcon}>🚫</div>
                <h3>Restricted Areas</h3>
                <p>We do not sell or ship crackers to government banned cities, such as Delhi - NCR.</p>
              </div>
              
              <div className={styles.updateCard}>
                <div className={styles.updateIcon}>📦</div>
                <h3>Delivery Policy</h3>
                <p>Pickup orders available for TN, Pondy and Bangalore. Other cities collect from transporters office.</p>
              </div>
              
              <div className={styles.updateCard}>
                <div className={styles.updateIcon}>💰</div>
                <h3>Minimum Orders</h3>
                <p>TN, Pondy: ₹3,000/- | Other States: ₹7,000/- (Transportation charges apply)</p>
              </div>
              
              <div className={styles.updateCard}>
                <div className={styles.updateIcon}>⏱️</div>
                <h3>Delivery Time</h3>
                <p>Pickup orders delivered between 3 to 9 days from Order Confirmation Date.</p>
              </div>
            </div>

            <div className={styles.detailedUpdates}>
              <h2>Detailed Updates</h2>
              <div className={styles.updatesList}>
                <div className={styles.updateItem}>
                  <span className={styles.number}>1</span>
                  <p>As per 2018 supreme court order, online sale of firecrackers are not permitted! We request you to add your products to the cart and submit the required crackers through the enquiry button.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>2</span>
                  <p>We are committed to do provision order pickup for the residents in TN, Pondy and Bangalore. Residents of other cities are required to collect the consignment from transporters office.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>3</span>
                  <p>For Pickup orders, Transportation charges need to be paid directly to the transporters office.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>4</span>
                  <p>This year, Pickup orders will be delivered between 3 to 9 days from Order Confirmation Date. The time interval is based on your destination.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>5</span>
                  <p>Our minimum order value for TN, Pondy is ₹3,000/-. Delivery charge is applicable.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>6</span>
                  <p>Our minimum order value for Other States is ₹7,000/- and transportation charges to be directly paid to transporter.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>7</span>
                  <p>The purchase is inclusive of GST @ 18%.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>8</span>
                  <p>During the peak season, We will ensure to deliver your order on or before Diwali.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>9</span>
                  <p>Best quality crackers are being tested randomly and added to the website.</p>
                </div>
                
                <div className={styles.updateItem}>
                  <span className={styles.number}>10</span>
                  <p>Other than the listed cities and towns, the customer is requested to enquire first before making the purchase.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
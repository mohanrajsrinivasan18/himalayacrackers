import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import styles from "./contact.module.scss";

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact Us | Himalaya Crackers"
        description="Get in touch with Himalaya Crackers. Call us, email us, or visit our store in Sivakasi for premium crackers and enquiries."
      />

      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1>Get In Touch</h1>
            <p>We're here to help with all your cracker needs. Reach out to us anytime!</p>
          </div>
        </section>

        {/* Contact Section */}
        <section className={styles.contact}>
          <div className={styles.container}>
            <div className={styles.contactGrid}>
              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📞</div>
                <h3>Call Us 24/7</h3>
                <p>Got questions? We're here to help!</p>
                <div className={styles.contactDetails}>
                  <strong>+91 97882 33556</strong>
                  <strong>+91 93451 77714</strong>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📧</div>
                <h3>Email Us</h3>
                <p>Send us your queries anytime</p>
                <div className={styles.contactDetails}>
                  <strong>himalayacrackers23@gmail.com</strong>
                </div>
              </div>

              <div className={styles.contactCard}>
                <div className={styles.contactIcon}>📍</div>
                <h3>Visit Our Store</h3>
                <p>Come see our products in person</p>
                <div className={styles.contactDetails}>
                  <strong>
                    3/179-1, Sivakasi to Virudhunagar Main Road,<br/>
                    Gurumoorthinayakanpatti, Amathur - 626005.
                  </strong>
                </div>
              </div>
            </div>

            {/* Additional Contact Info */}
            <div className={styles.additionalInfo}>
              <div className={styles.infoCard}>
                <h3>Business Hours</h3>
                <div className={styles.hours}>
                  <div className={styles.hourRow}>
                    <span>Monday - Saturday</span>
                    <span>9:00 AM - 8:00 PM</span>
                  </div>
                  <div className={styles.hourRow}>
                    <span>Sunday</span>
                    <span>10:00 AM - 6:00 PM</span>
                  </div>
                </div>
              </div>

              <div className={styles.infoCard}>
                <h3>Quick Enquiry</h3>
                <p>For immediate assistance with bulk orders or special requirements, call us directly or visit our store.</p>
                <div className={styles.quickActions}>
                  <a href="tel:+919788233556" className={styles.callBtn}>
                    📞 Call Now
                  </a>
                  <a href="/enquiry" className={styles.enquiryBtn}>
                    📋 Send Enquiry
                  </a>
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
import styles from "./Footer.module.scss";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <h3>Himalaya Crackers</h3>
          <p>
            Premium Sivakasi crackers for retail & bulk orders.
            Trusted quality, safe packing, and timely delivery
            across Tamil Nadu.
          </p>
        </div>

        <div className={styles.links}>
          <h4>Quick Links</h4>
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/enquiry">Enquiry</Link>
        </div>

        <div className={styles.links}>
          <h4>Categories</h4>
          <span>Gift Boxes</span>
          <span>Kids Crackers</span>
          <span>Family Pack</span>
          <span>Fancy Crackers</span>
        </div>

        <div className={styles.links}>
          <h4>Our Policies</h4>
          <Link href="/policies/cancellation-refund">Cancellation & Refund</Link>
          <Link href="/policies/our-updates">Our Updates</Link>
        </div>

        <div className={styles.contact}>
          <h4>Contact</h4>
          <p>📍 Sivakasi, Tamil Nadu</p>
          <p>📞 +91 9XXXXXXXXX</p>
          <p>✉️ sales@himalayacrackers.com</p>
          <p className={styles.note}>
            * As per TN regulations, online payments are not accepted.
            Orders are processed via enquiry only.
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Himalaya Crackers</span>
        <span>All Rights Reserved</span>
      </div>
    </footer>
  );
}

import Link from "next/link";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.imageSection}></div>
      <div className={styles.content}>
        <h1 className={styles.headline}>
          Premium Sivakasi Crackers
        </h1>
        <p className={styles.subheadline}>
          Factory-direct quality · Safe packing · Trusted by 10,000+ customers
        </p>
        <div className={styles.actions}>
          <Link href="/products" className={styles.primary}>
            Browse Crackers
          </Link>
          <Link href="/enquiry" className={styles.secondary}>
            Get Quotation
          </Link>
        </div>
      </div>
    </section>
  );
}

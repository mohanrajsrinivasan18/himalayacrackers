import styles from "./TopNotice.module.scss";

export default function TopNotice() {
  return (
    <div className={styles.notice}>
      <div className={styles.left}>
        <span className={styles.icon}>📞</span>
        <span>Order Help: +91 9XXXXXXXXX</span>
      </div>
      <div className={styles.right}>
        <span className={styles.badge}>⚠️</span>
        <span>As per Supreme Court order, only <strong>GREEN CRACKERS</strong> are sold</span>
      </div>
    </div>
  );
}

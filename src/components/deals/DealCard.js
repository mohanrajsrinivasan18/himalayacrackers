import styles from "./DealCard.module.scss";

export default function DealCard({ deal, onClick }) {
  return (
    <div className={styles.card} onClick={onClick}>
      <img
        src={deal.image}
        alt={deal.title}
        className={styles.image}
        loading="lazy"
      />

      <div className={styles.content}>
        <h3 className={styles.title}>{deal.title}</h3>
        <p className={styles.desc}>{deal.description}</p>
      </div>

      <div className={styles.cta}>
        <span>Learn More</span>
      </div>
    </div>
  );
}

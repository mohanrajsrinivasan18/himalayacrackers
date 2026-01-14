import styles from "./DashboardStats.module.scss";

export default function DashboardStats({
  today,
  pending,
  paid
}) {
  return (
    <div className={styles.grid}>
      <Stat label="Today" value={today} color="blue" />
      <Stat label="Pending" value={pending} color="orange" />
      <Stat label="Paid" value={paid} color="green" />
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className={`${styles.card} ${styles[color]}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}
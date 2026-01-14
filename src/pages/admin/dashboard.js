import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "./AdminDashboard.module.scss";
import DashboardStats from "@/components/admin/DashboardStats";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(res => res.json())
      .then(setStats);
  }, []);

  if (!stats) {
    return (
      <AdminLayout>
        <p>Loading dashboard…</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className={styles.title}>Dashboard</h1>

      {/* TOP METRICS */}
      <div className={styles.grid}>
        <Metric
          label="Total Products"
          value={stats.productCount}
        />
        <Metric
          label="Low Stock Items"
          value={stats.lowStockCount}
          warning
        />
        <Metric
          label="Today’s Enquiries"
          value={stats.todayEnquiries}
        />
      </div>

      {/* STATUS SUMMARY */}
      <DashboardStats
        today={stats.today_count ?? 0}
        pending={stats.pending_count ?? 0}
        paid={stats.paid_count ?? 0}
      />
    </AdminLayout>
  );
}

function Metric({ label, value, warning }) {
  return (
    <div
      className={`${styles.card} ${
        warning ? styles.warning : ""
      }`}
    >
      <h3>{label}</h3>
      <strong>{value}</strong>
    </div>
  );
}


import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./AdminLayout.module.scss";

export default function AdminLayout({ children }) {
  const [lowStockCount, setLowStockCount] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadLowStock() {
      try {
        const res = await fetch("/api/products/list");
        const data = await res.json();
        const low = data.filter(p => p.stock <= 5);
        setLowStockCount(low.length);
      } catch (error) {
        console.error('Failed to load low stock data:', error);
      }
    }
    loadLowStock();
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [router.pathname]);

  return (
    <div className={styles.layout}>
      {/* Sidebar - always render, control with CSS */}
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.sidebarHeader}>
          <h2>Admin</h2>
          <button 
            className={styles.closeButton}
            onClick={() => setSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        
        <nav className={styles.sidebarNav}>
          <a 
            href="/admin/dashboard"
            className={router.pathname === "/admin/dashboard" ? styles.active : ""}
            onClick={() => setSidebarOpen(false)}
          >
            Dashboard
          </a>
          <a 
            href="/admin/products"
            className={router.pathname === "/admin/products" ? styles.active : ""}
            onClick={() => setSidebarOpen(false)}
          >
            Products
          </a>
          <a 
            href="/admin/enquiries"
            className={router.pathname === "/admin/enquiries" ? styles.active : ""}
            onClick={() => setSidebarOpen(false)}
          >
            Enquiries
          </a>
          <a 
            href="/admin/scanner"
            className={router.pathname === "/admin/scanner" ? styles.active : ""}
            onClick={() => setSidebarOpen(false)}
          >
            Scanner
          </a>
        </nav>
      </div>
      
      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <div className={styles.main}>
        {/* Topbar */}
        <header className={styles.topbar}>
          <button 
            className={styles.menuButton}
            onClick={() => setSidebarOpen(true)}
          >
            ☰
          </button>
          <h1>Himalaya Crackers Admin</h1>
        </header>
        
        <div className={styles.content}>
          {lowStockCount > 0 && (
            <div
              className={styles.lowStockBanner}
              onClick={() => router.push("/admin/products")}
            >
              ⚠️ {lowStockCount} product{lowStockCount !== 1 ? 's are' : ' is'} low in stock. Click to review.
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

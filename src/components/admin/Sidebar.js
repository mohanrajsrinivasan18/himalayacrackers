import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./Sidebar.module.scss";

export default function Sidebar({ onClose }) {
  const router = useRouter();
  
  const isActive = (path) => router.pathname === path;
  
  const handleLinkClick = (e) => {
    // Close sidebar when a link is clicked on mobile
    if (onClose) {
      setTimeout(() => onClose(), 100); // Small delay to allow navigation
    }
  };

  const handleCloseClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClose) {
      onClose();
    }
  };
  
  return (
    <aside className={styles.sidebar}>
      <div className={styles.header}>
        <div className={styles.brand}>
          <h2>Admin</h2>
        </div>
        <button 
          className={styles.closeBtn}
          onClick={handleCloseClick}
          aria-label="Close menu"
          type="button"
        >
          ✕
        </button>
      </div>
      
      <nav className={styles.nav}>
        <Link 
          href="/admin/dashboard" 
          className={`${styles.link} ${isActive("/admin/dashboard") ? styles.active : ""}`}
          onClick={handleLinkClick}
        >
          Dashboard
        </Link>
        <Link 
          href="/admin/products" 
          className={`${styles.link} ${isActive("/admin/products") ? styles.active : ""}`}
          onClick={handleLinkClick}
        >
          Products
        </Link>
        <Link 
          href="/admin/enquiries" 
          className={`${styles.link} ${isActive("/admin/enquiries") ? styles.active : ""}`}
          onClick={handleLinkClick}
        >
          Enquiries
        </Link>
        <Link 
          href="/admin/scanner" 
          className={`${styles.link} ${isActive("/admin/scanner") ? styles.active : ""}`}
          onClick={handleLinkClick}
        >
          Scanner
        </Link>
      </nav>
    </aside>
  );
}

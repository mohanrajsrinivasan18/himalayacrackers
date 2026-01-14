import { useState, useEffect } from "react";
import styles from "./ScrollProgress.module.scss";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFilters = () => {
    const filtersElement = document.querySelector('[class*="FilterBar"]');
    if (filtersElement) {
      filtersElement.scrollIntoView({ behavior: "smooth" });
    } else {
      // If no filters, scroll to products section
      const productsElement = document.querySelector('#products');
      if (productsElement) {
        productsElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  if (scrollProgress < 5) return null;

  return (
    <div className={styles.fabContainer}>
      <div className={styles.progressRing}>
        <svg className={styles.progressSvg} width="60" height="60">
          <circle
            className={styles.progressBg}
            cx="30"
            cy="30"
            r="26"
          />
          <circle
            className={styles.progressFill}
            cx="30"
            cy="30"
            r="26"
            style={{
              strokeDashoffset: 163.36 - (163.36 * scrollProgress) / 100
            }}
          />
        </svg>
        <button 
          className={styles.fab}
          onClick={scrollToFilters}
          aria-label="Go to search"
        >
          ↑
        </button>
      </div>
    </div>
  );
}
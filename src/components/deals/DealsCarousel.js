import { useRef } from "react";
import DealCard from "./DealCard";
import styles from "./DealsCarousel.module.scss";

export default function DealsCarousel({ deals }) {
  const scrollRef = useRef(null);

  const scrollBy = (dir) => {
    scrollRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth"
    });
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        {/* LEFT ARROW */}
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={() => scrollBy("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        {/* SCROLL CONTAINER */}
        <div className={styles.slider} ref={scrollRef}>
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>

        {/* RIGHT ARROW */}
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={() => scrollBy("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </section>
  );
}

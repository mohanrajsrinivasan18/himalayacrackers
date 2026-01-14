import { useState, useRef } from "react";
import styles from "./CategoriesSection.module.scss";
import { useRouter } from "next/router";

const categories = [
  { title: "Gift Boxes", slug: "gift-boxes", image: "/images/cat-gift.jpg" },
  { title: "Kids Crackers", slug: "kids-crackers", image: "/images/cat-kids.jpg" },
  { title: "Family Pack", slug: "family-pack", image: "/images/cat-family.jpg" },
  { title: "Premium Crackers", slug: "premium-crackers", image: "/images/cat-premium.jpg" }
];

export default function CategoriesSection() {
  const router = useRouter();
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className={styles.section}>
      <h2>Shop by Category</h2>

      <div className={styles.carouselWrapper}>
        {showLeftArrow && (
          <button className={styles.arrow} onClick={() => scroll('left')}>
            ←
          </button>
        )}
        <div className={styles.grid} ref={scrollRef}>
          {categories.map(cat => (
            <div
              key={cat.slug}
              className={styles.card}
              onClick={() => router.push(`/products?category=${cat.slug}`)}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${cat.image})` }}
              />
              <div className={styles.overlay}>
                <span>{cat.title}</span>
                <span className={styles.arrow}>→</span>
              </div>
            </div>
          ))}
        </div>
        {showRightArrow && (
          <button className={styles.arrow} onClick={() => scroll('right')}>
            →
          </button>
        )}
      </div>
    </section>
  );
}

import styles from "./CategoryFilter.module.scss";

export default function CategoryFilter({
  categories,
  active,
  onChange
}) {
  return (
    <div className={styles.wrap}>
      <button
        className={!active ? styles.active : ""}
        onClick={() => onChange("")}
      >
        All
      </button>

      {categories.map(cat => (
        <button
          key={cat}
          className={active === cat ? styles.active : ""}
          onClick={() => onChange(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

import styles from "./FilterBar.module.scss";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import CustomSelect from "./CustomSelect";

export default function FilterBar({
  search,
  setSearch,
  view,
  setView,
  activeCategory,
  setActiveCategory,
  categories = [],
  clearFilters,
  sortBy,
  setSortBy,
  gridDensity,
  setGridDensity
}) {
  const isHydrated = useHydration();
  const itemCountRaw = useCartStore(s => s.count());
  const itemCount = isHydrated ? itemCountRaw : 0;
  const hasFilters = search || activeCategory || sortBy !== "name";

  // Prepare options for custom selects
  const categoryOptions = [
    { value: "", label: "All Categories" },
    ...categories.map(cat => ({
      value: cat.slug,
      label: `${cat.name} (${cat.count})`
    }))
  ];

  const sortOptions = [
    { value: "name", label: "Sort by Name" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" }
  ];

  return (
    <>
      <div className={styles.bar}>
        <div className={styles.searchSection}>
          <div className={styles.search}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              placeholder="Search crackers…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <button 
                className={styles.clearSearch}
                onClick={() => setSearch("")}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className={styles.filters}>
          <div className={styles.categoryFilter}>
            <CustomSelect
              value={activeCategory}
              onChange={setActiveCategory}
              options={categoryOptions}
              placeholder="All Categories"
            />
          </div>

          <div className={styles.sortFilter}>
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={sortOptions}
              placeholder="Sort by Name"
            />
          </div>
        </div>

        <div className={styles.viewControls}>
          <div className={styles.actions}>
            <button
              className={`${styles.toggleBtn} ${view === "card" ? styles.active : ""}`}
              onClick={() => setView("card")}
              title="Card View"
            >
              Cards
            </button>

            <button
              className={`${styles.toggleBtn} ${view === "table" ? styles.active : ""}`}
              onClick={() => setView("table")}
              title="Table View"
            >
              Table
            </button>
          </div>

          {view === "card" && (
            <div className={styles.densityControl}>
              <button
                className={`${styles.densityBtn} ${gridDensity === "normal" ? styles.active : ""}`}
                onClick={() => setGridDensity("normal")}
                title="Normal Grid"
              >
                ⬜⬜
              </button>
              <button
                className={`${styles.densityBtn} ${gridDensity === "compact" ? styles.active : ""}`}
                onClick={() => setGridDensity("compact")}
                title="Compact Grid"
              >
                ⬜⬜⬜
              </button>
              <button
                className={`${styles.densityBtn} ${gridDensity === "dense" ? styles.active : ""}`}
                onClick={() => setGridDensity("dense")}
                title="Dense Grid"
              >
                ⬜⬜⬜⬜
              </button>
            </div>
          )}
        </div>
      </div>

      {hasFilters && (
        <div className={styles.activeFilters}>
          <div className={styles.chips}>
            {search && (
              <span className={styles.chip}>
                🔍 "{search}"
                <button onClick={() => setSearch("")}>✕</button>
              </span>
            )}
            {activeCategory && (
              <span className={styles.chip}>
                📂 {categories.find(c => c.slug === activeCategory)?.name || activeCategory}
                <button onClick={() => setActiveCategory("")}>✕</button>
              </span>
            )}
            {sortBy !== "name" && (
              <span className={styles.chip}>
                🔄 {sortBy === "price-low" ? "Price ↑" : sortBy === "price-high" ? "Price ↓" : sortBy}
                <button onClick={() => setSortBy("name")}>✕</button>
              </span>
            )}
          </div>
          <button className={styles.clearAll} onClick={clearFilters}>
            Clear All Filters
          </button>
        </div>
      )}

      {/* Mobile Sticky Toggle */}
      <div className={`${styles.mobileToggle} ${itemCount > 0 ? styles.withCart : styles.noCart}`}>
        <button
          className={`${styles.toggleBtn} ${view === "card" ? styles.active : ""}`}
          onClick={() => setView("card")}
        >
          Cards
        </button>
        <button
          className={`${styles.toggleBtn} ${view === "table" ? styles.active : ""}`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
    </>
  );
}

import { useState, useMemo } from "react";
import ProductCard from "./ProductCard";
import ProductTable from "./ProductTable";
import FilterBar from "@/components/filters/FilterBar";
import styles from "./ProductExplorer.module.scss";

export default function ProductExplorer({ products }) {
  const [view, setView] = useState("card");
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [gridDensity, setGridDensity] = useState("compact"); // normal, compact, dense

  const categories = useMemo(() => {
    const cats = [...new Set(products.map(p => p.category_slug || p.category).filter(Boolean))];
    return cats.map(cat => ({
      slug: cat,
      name: cat.replace('-', ' ').toUpperCase(),
      count: products.filter(p => (p.category_slug || p.category) === cat).length
    }));
  }, [products]);

  const sortedAndFiltered = useMemo(() => {
    let filtered = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !activeCategory || p.category_slug === activeCategory || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, search, activeCategory, sortBy]);

  // Group products by category when no filters are active
  const groupedProducts = useMemo(() => {
    if (search || activeCategory) return null; // Don't group when filtering
    
    return sortedAndFiltered.reduce((acc, product) => {
      const cat = product.category_slug || product.category || 'uncategorized';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(product);
      return acc;
    }, {});
  }, [sortedAndFiltered, search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("");
    setSortBy("name");
  };

  // Quick category navigation
  const scrollToCategory = (categorySlug) => {
    const element = document.getElementById(`category-${categorySlug}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Sticky Category Navigation */}
      {!search && !activeCategory && (
        <div className={styles.categoryNav}>
          <div className={styles.categoryTabs}>
            {categories.map(cat => (
              <button
                key={cat.slug}
                className={styles.categoryTab}
                onClick={() => scrollToCategory(cat.slug)}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>
      )}

      <FilterBar
        search={search}
        setSearch={setSearch}
        view={view}
        setView={setView}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        categories={categories}
        clearFilters={clearFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
        gridDensity={gridDensity}
        setGridDensity={setGridDensity}
      />

      <div className={styles.resultsHeader}>
        <span className={styles.count}>
          Showing {sortedAndFiltered.length} products
        </span>
      </div>

      {view === "card" ? (
        <div className={`${styles.cardContainer} ${styles[gridDensity]}`}>
          {groupedProducts ? (
            // Show grouped by category
            Object.entries(groupedProducts).map(([categorySlug, categoryProducts]) => (
              <div key={categorySlug} id={`category-${categorySlug}`} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h2>{categorySlug.replace('-', ' ').toUpperCase()}</h2>
                  <span className={styles.categoryCount}>
                    {categoryProducts.length} products
                  </span>
                </div>
                <div className={styles.grid}>
                  {categoryProducts.map(p => (
                    <ProductCard key={p.id} product={p} compact={gridDensity !== 'normal'} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            // Show filtered results
            <div className={styles.grid}>
              {sortedAndFiltered.map(p => (
                <ProductCard key={p.id} product={p} compact={gridDensity !== 'normal'} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className={styles.tableContainer}>
          {groupedProducts ? (
            // Show grouped by category for table view
            Object.entries(groupedProducts).map(([categorySlug, categoryProducts]) => (
              <div key={categorySlug} id={`category-${categorySlug}`} className={styles.categorySection}>
                <div className={styles.categoryHeader}>
                  <h2>{categorySlug.replace('-', ' ').toUpperCase()}</h2>
                  <span className={styles.categoryCount}>
                    {categoryProducts.length} products
                  </span>
                </div>
                <ProductTable products={categoryProducts} />
              </div>
            ))
          ) : (
            // Show filtered results for table view
            <ProductTable products={sortedAndFiltered} />
          )}
        </div>
      )}

      {sortedAndFiltered.length === 0 && (
        <div className={styles.noResults}>
          <h3>No products found</h3>
          <p>Try adjusting your search or filters</p>
          <button onClick={clearFilters} className={styles.resetBtn}>
            Show all products
          </button>
        </div>
      )}
    </div>
  );
}

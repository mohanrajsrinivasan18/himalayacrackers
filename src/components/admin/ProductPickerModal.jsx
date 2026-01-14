import { useEffect, useState } from "react";
import styles from "./ProductPickerModal.module.scss";

export default function ProductPickerModal({
  open,
  onClose,
  onAdd,
  existingItems = []
}) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (!open) return;
    loadProducts();
    setSearch("");
    setSelected(null);
    setQty(1);
    setCategory("");
  }, [open]);

  async function loadProducts() {
    setLoading(true);
    try {
      const res = await fetch("/api/products/list");
      const data = await res.json();
      setProducts(data || []);
    } catch (error) {
      console.error("Failed to load products:", error);
    }
    setLoading(false);
  }

  function handleAdd() {
    if (!selected || qty < 1) return;

    const existing = existingItems.find(i => i.id === selected.id);

    if (existing) {
      onAdd({
        ...existing,
        qty: existing.qty + qty
      });
    } else {
      onAdd({
        id: selected.id,
        name: selected.name,
        price: selected.price,
        category: selected.category,
        qty
      });
    }

    setSelected(null);
    setQty(1);
    onClose();
  }

  if (!open) return null;

  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !category || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const isAlreadyAdded = (productId) => {
    return existingItems.some(item => item.id === productId);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Add Product to Order</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.filters}>
          <div className={styles.searchBox}>
            <input
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <select 
            value={category} 
            onChange={e => setCategory(e.target.value)}
            className={styles.categorySelect}
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className={styles.content}>
          {loading ? (
            <div className={styles.loading}>
              <p>Loading products...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty}>
              <p>No products found</p>
              {search && (
                <button onClick={() => setSearch("")} className={styles.clearBtn}>
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <div className={styles.productGrid}>
              {filtered.map(p => (
                <div
                  key={p.id}
                  className={`${styles.productCard} ${
                    selected?.id === p.id ? styles.selected : ""
                  } ${isAlreadyAdded(p.id) ? styles.alreadyAdded : ""}`}
                  onClick={() => setSelected(p)}
                >
                  <div className={styles.productInfo}>
                    <div className={styles.productName}>{p.name}</div>
                    {p.category && (
                      <div className={styles.productCategory}>{p.category}</div>
                    )}
                    <div className={styles.productPrice}>₹{p.price.toLocaleString()}</div>
                    {p.stock <= 5 && (
                      <div className={styles.lowStock}>Low Stock: {p.stock}</div>
                    )}
                  </div>
                  {isAlreadyAdded(p.id) && (
                    <div className={styles.addedBadge}>Added</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {selected && (
          <div className={styles.selectedProduct}>
            <div className={styles.selectedInfo}>
              <strong>{selected.name}</strong>
              <span>₹{selected.price.toLocaleString()}</span>
            </div>
            <div className={styles.qtyControl}>
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                max={selected.stock || 999}
                value={qty}
                onChange={e => setQty(Number(e.target.value))}
                className={styles.qtyInput}
              />
            </div>
            <div className={styles.subtotal}>
              Subtotal: ₹{(selected.price * qty).toLocaleString()}
            </div>
          </div>
        )}

        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.addBtn}
            disabled={!selected || qty < 1}
            onClick={handleAdd}
          >
            Add to Order
          </button>
        </div>
      </div>
    </div>
  );
}
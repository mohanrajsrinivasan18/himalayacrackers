import { useEffect, useState } from "react";
import styles from "./EnquiryItemsEditor.module.scss";
import ProductPickerModal from "./ProductPickerModal";

export default function EnquiryItemsEditor({ enquiry, onSave }) {
  const [items, setItems] = useState(enquiry.items || []);
  const [saving, setSaving] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const isLocked = enquiry.status === "PAID" || enquiry.status === "DELIVERED";

  useEffect(() => {
    setItems(enquiry.items || []);
  }, [enquiry.items]);

  function updateQty(index, qty) {
    if (qty < 1) return;
    const copy = [...items];
    copy[index].qty = qty;
    setItems(copy);
  }

  function addItem(newItem) {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === newItem.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = newItem;
        return copy;
      }
      return [...prev, newItem];
    });
  }

  function removeItem(index) {
    const copy = [...items];
    copy.splice(index, 1);
    setItems(copy);
  }

  async function saveItems() {
    setSaving(true);
    await onSave(items);
    setSaving(false);
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className={styles.wrap}>
        <div className={styles.header}>
          <h4>Products</h4>
          {!isLocked && (
            <button className={styles.addBtn} onClick={() => setShowPicker(true)}>
              + Add Product
            </button>
          )}
        </div>
        <div className={styles.emptyState}>
          <p>No products added yet</p>
          {!isLocked && (
            <button className={styles.emptyAddBtn} onClick={() => setShowPicker(true)}>
              Add First Product
            </button>
          )}
        </div>
        <ProductPickerModal
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onAdd={addItem}
          existingItems={items}
        />
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <h4>Products ({items.length})</h4>
        {!isLocked && (
          <button className={styles.addBtn} onClick={() => setShowPicker(true)}>
            + Add Product
          </button>
        )}
      </div>
      
      <div className={styles.tableHeader}>
        <div>Product</div>
        <div>Qty</div>
        <div>Price</div>
        <div>Total</div>
        <div></div>
      </div>
      
      <div className={styles.list}>
        {items.map((item, i) => (
          <div key={i} className={styles.row}>
            <div className={styles.productInfo}>
              <div className={styles.name}>{item.name}</div>
              {item.category && (
                <div className={styles.category}>{item.category}</div>
              )}
            </div>

            <div className={styles.qtyControl}>
              <input
                type="number"
                disabled={isLocked}
                min="1"
                value={item.qty}
                onChange={e => updateQty(i, Number(e.target.value))}
                className={styles.qtyInput}
              />
            </div>

            <div className={styles.price}>₹{item.price.toLocaleString()}</div>
            <div className={styles.subtotal}>₹{(item.price * item.qty).toLocaleString()}</div>

            {!isLocked && (
              <button 
                className={styles.removeBtn}
                onClick={() => removeItem(i)}
                title="Remove item"
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <div className={styles.totalSection}>
          <span className={styles.totalLabel}>Total Amount:</span>
          <span className={styles.totalAmount}>₹{total.toLocaleString()}</span>
        </div>
        {!isLocked && (
          <button 
            className={styles.saveBtn}
            onClick={saveItems} 
            disabled={saving}
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        )}
      </div>
      
      <ProductPickerModal
        open={showPicker}
        onClose={() => setShowPicker(false)}
        onAdd={addItem}
        existingItems={items}
      />
      
      {isLocked && (
        <div className={styles.lockedNote}>
          🔒 Order is locked after payment. Items cannot be modified.
        </div>
      )}
    </div>
  );
}
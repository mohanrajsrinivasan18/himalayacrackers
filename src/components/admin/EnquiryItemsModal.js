import { useEffect, useState } from "react";
import styles from "./EnquiryItemsModal.module.scss";
import ProductPickerModal from "./ProductPickerModal";

export default function EnquiryItemsModal({ enquiry, onClose, onSave }) {
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

  async function handleSave() {
    setSaving(true);
    await onSave(items);
    setSaving(false);
    onClose();
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <div className={styles.header}>
          <h3>Edit Order Products - {enquiry.customer_name}</h3>
          <button className={styles.closeBtn} onClick={onClose}>×</button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No products in this order</p>
              {!isLocked && (
                <button className={styles.addFirstBtn} onClick={() => setShowPicker(true)}>
                  Add First Product
                </button>
              )}
            </div>
          ) : (
            <>
              <div className={styles.tableHeader}>
                <div>Product</div>
                <div>Quantity</div>
                <div>Price</div>
                <div>Total</div>
                <div>Action</div>
              </div>
              
              <div className={styles.itemsList}>
                {items.map((item, i) => (
                  <div key={i} className={styles.itemRow}>
                    <div className={styles.productInfo}>
                      <div className={styles.productName}>{item.name}</div>
                      {item.category && (
                        <div className={styles.productCategory}>{item.category}</div>
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
                    <div className={styles.itemTotal}>₹{(item.price * item.qty).toLocaleString()}</div>

                    <div className={styles.actions}>
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
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.footer}>
          <div className={styles.leftSection}>
            {!isLocked && (
              <button className={styles.addBtn} onClick={() => setShowPicker(true)}>
                + Add Product
              </button>
            )}
            {isLocked && (
              <div className={styles.lockedNote}>
                🔒 Order is locked after payment
              </div>
            )}
          </div>
          
          <div className={styles.rightSection}>
            <div className={styles.totalSection}>
              <span className={styles.totalLabel}>Total: </span>
              <span className={styles.totalAmount}>₹{total.toLocaleString()}</span>
            </div>
            
            <div className={styles.actionButtons}>
              <button className={styles.cancelBtn} onClick={onClose}>
                Cancel
              </button>
              {!isLocked && (
                <button 
                  className={styles.saveBtn}
                  onClick={handleSave} 
                  disabled={saving}
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              )}
            </div>
          </div>
        </div>

        <ProductPickerModal
          open={showPicker}
          onClose={() => setShowPicker(false)}
          onAdd={addItem}
          existingItems={items}
        />
      </div>
    </div>
  );
}
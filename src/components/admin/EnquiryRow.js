import { useState } from "react";
import styles from "./EnquiryRow.module.scss";
import EnquiryItemsModal from "./EnquiryItemsModal";
import EnquiryTimeline from "./EnquiryTimeline";
import StatusDropdown from "./StatusDropdown";
import { sendWhatsApp } from "@/lib/whatsapp";

const STATUS_OPTIONS = [
  "RECEIVED",
  "CONTACTED", 
  "NOT_REACHABLE",
  "IN_TRANSIT",
  "PAID",
  "DELIVERED"
];

const PAYMENT_METHODS = [
  "UPI",
  "Card",
  "Net Banking",
  "Cash",
  "Other"
];

export default function EnquiryRow({ 
  enquiry, 
  onUpdate, 
  onSaveItems, 
  savingId
}) {
  const [expanded, setExpanded] = useState(false);
  const [showItemsModal, setShowItemsModal] = useState(false);
  
  const isLocked = enquiry.original_status === "PAID" || enquiry.original_status === "DELIVERED";
  const isSaving = savingId === enquiry.id;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={styles.card}>
      {/* Compact Row */}
      <div className={styles.compactRow} onClick={() => setExpanded(!expanded)}>
        <div className={styles.mainInfo}>
          <div className={styles.orderNumber}>
            {enquiry.enquiry_number ? (
              <span className={styles.enquiryNum}>#{enquiry.enquiry_number}</span>
            ) : (
              <span className={styles.noNumber}>—</span>
            )}
          </div>
          
          <div className={styles.namePhone}>
            <h3 className={styles.name}>{enquiry.customer_name}</h3>
            <span className={styles.phone}>{enquiry.phone}</span>
          </div>
          
          <div className={styles.orderValue}>
            <strong>₹{enquiry.total}</strong>
            {enquiry.items && enquiry.items.length > 0 && (
              <div className={styles.itemCount}>
                {enquiry.items.length} item{enquiry.items.length !== 1 ? 's' : ''}
              </div>
            )}
          </div>
          
          <div className={styles.paymentMethod}>
            <select
              value={enquiry.payment_method || ""}
              disabled={isLocked}
              onChange={(ev) => {
                ev.stopPropagation();
                onUpdate(enquiry.id, { payment_method: ev.target.value });
              }}
              onClick={(ev) => ev.stopPropagation()}
              className={styles.paymentSelect}
            >
              <option value="">Payment</option>
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>
          
          <div className={styles.statusBadge}>
            <span className={`${styles.status} ${styles[enquiry.status]}`}>
              {enquiry.status}
            </span>
          </div>
          
          <div className={styles.date}>
            {formatDate(enquiry.created_at)}
          </div>
        </div>
        
        <div className={styles.expandIcon}>
          {expanded ? '▼' : '▶'}
        </div>
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className={styles.expandedContent}>
          {/* Address Section */}
          <div className={styles.section}>
            <h4>Address</h4>
            <p>{enquiry.address || "—"}</p>
            <p>Pincode: {enquiry.pincode || "—"}</p>
          </div>

          {/* Payment Method Section */}
          <div className={styles.section}>
            <h4>Payment Method</h4>
            <select
              value={enquiry.payment_method || ""}
              disabled={isLocked}
              onChange={(ev) => {
                onUpdate(enquiry.id, { payment_method: ev.target.value });
              }}
              className={styles.paymentSelect}
            >
              <option value="">Not specified</option>
              {PAYMENT_METHODS.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          {/* Notes Section */}
          <div className={styles.notesSection}>
            <div className={styles.noteColumn}>
              <h4>Customer Note</h4>
              <p>{enquiry.customer_note || "—"}</p>
            </div>
            
            <div className={styles.noteColumn}>
              <h4>Admin Note</h4>
              <textarea
                value={enquiry.admin_note || ""}
                disabled={isLocked}
                placeholder={isLocked ? "Order is locked after payment" : "Internal notes..."}
                onChange={(ev) => {
                  onUpdate(enquiry.id, { admin_note: ev.target.value });
                }}
              />
            </div>
          </div>

          {/* Products Section */}
          <div className={styles.section}>
            <div className={styles.productsPreview}>
              <h4>Products ({enquiry.items?.length || 0})</h4>
              {enquiry.items && enquiry.items.length > 0 ? (
                <div className={styles.productsList}>
                  {enquiry.items.slice(0, 3).map((item, i) => (
                    <div key={i} className={styles.productItem}>
                      <span className={styles.productName}>{item.name}</span>
                      <span className={styles.productQty}>×{item.qty}</span>
                      <span className={styles.productPrice}>₹{(item.price * item.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  {enquiry.items.length > 3 && (
                    <div className={styles.moreItems}>
                      +{enquiry.items.length - 3} more items
                    </div>
                  )}
                </div>
              ) : (
                <p className={styles.noProducts}>No products added</p>
              )}
              <button 
                className={styles.editProductsBtn}
                disabled={isLocked}
                onClick={() => setShowItemsModal(true)}
              >
                {isLocked ? "View Products" : "Edit Products"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <StatusDropdown
              value={enquiry.status}
              disabled={isLocked}
              onChange={(status) => {
                onUpdate(enquiry.id, { status });
              }}
            />

            <button
              disabled={isLocked}
              onClick={() => setShowItemsModal(true)}
            >
              {isLocked ? "View Products" : "Edit Products"}
            </button>

            <button
              onClick={() => window.open(`/admin/print/${enquiry.id}`, "_blank")}
            >
              Print
            </button>

            <button
              onClick={async () => {
                try {
                  await sendWhatsApp(enquiry);
                } catch (err) {
                  alert(err.message);
                }
              }}
            >
              WhatsApp
            </button>

            <button
              className={styles.saveBtn}
              disabled={isLocked || isSaving}
              onClick={() => onUpdate(enquiry.id, null, true)} // true indicates save action
            >
              {isSaving ? "Saving…" : "Save"}
            </button>

            <button
              onClick={async () => {
                const res = await fetch(`/api/admin/enquiries/pdf?enquiry_id=${enquiry.id}`);
                const { pdfUrl } = await res.json();
                
                const msg = encodeURIComponent(
                  `Hi ${enquiry.customer_name},\n\nPlease find your quotation attached.\n\n– Himalaya Crackers`
                );
                
                window.open(`https://wa.me/91${enquiry.phone}?text=${msg}`, "_blank");
                window.open(pdfUrl, "_blank");
              }}
            >
              Send Quotation
            </button>

            {isLocked && (
              <span className={styles.lockBadge}>
                🔒 Locked after payment
              </span>
            )}
          </div>

          {/* Timeline */}
          <EnquiryTimeline enquiryId={enquiry.id} />
        </div>
      )}
      
      {/* Items Modal */}
      {showItemsModal && (
        <EnquiryItemsModal
          enquiry={enquiry}
          onClose={() => setShowItemsModal(false)}
          onSave={(items) => onSaveItems(enquiry.id, items)}
        />
      )}
    </div>
  );
}
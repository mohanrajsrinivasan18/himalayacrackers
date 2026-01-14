import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./PrintEnquiry.module.scss";

export default function PrintEnquiry() {
  const router = useRouter();
  const { id } = router.query;

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    loadEnquiry();
  }, [id]);

  async function loadEnquiry() {
    setLoading(true);
    const res = await fetch(`/api/admin/enquiries/get?id=${id}`);
    const data = await res.json();
    setEnquiry(data);
    setLoading(false);
  }

  if (loading) return <p>Loading…</p>;
  if (!enquiry) return <p>Enquiry not found</p>;

  return (
    <div className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <h1>Himalaya Crackers</h1>
        <p>Order / Enquiry Slip</p>
      </header>

      {/* CUSTOMER INFO */}
      <section className={styles.section}>
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> {enquiry.customer_name}</p>
        <p><strong>Phone:</strong> {enquiry.phone}</p>
        <p><strong>Address:</strong> {enquiry.address}</p>
        <p><strong>Pincode:</strong> {enquiry.pincode}</p>
      </section>

      {/* NOTES */}
      {enquiry.customer_note && (
        <section className={styles.section}>
          <h3>Customer Note</h3>
          <p>{enquiry.customer_note}</p>
        </section>
      )}

      {enquiry.admin_note && (
        <section className={styles.section}>
          <h3>Admin Note</h3>
          <p>{enquiry.admin_note}</p>
        </section>
      )}

      {/* ITEMS */}
      <section className={styles.section}>
        <h3>Ordered Products</h3>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {enquiry.items.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>₹{item.price}</td>
                <td>₹{item.price * item.qty}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* TOTAL */}
      <section className={styles.total}>
        <strong>Total Amount: ₹{enquiry.total}</strong>
      </section>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <p>Status: {enquiry.status}</p>
        <p>Thank you for choosing Himalaya Crackers</p>
      </footer>

      {/* PRINT BUTTON */}
      <div className={styles.actions}>
        <button onClick={() => window.print()}>
          Print
        </button>
      </div>
    </div>
  );
}

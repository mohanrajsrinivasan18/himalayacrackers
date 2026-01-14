import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import useCartStore from "@/store/cartStore";
import { useHydration } from "@/hooks/useHydration";
import styles from "./EnquiryPage.module.scss";

export default function EnquiryPage() {
  const router = useRouter();
  const isHydrated = useHydration();

  const items = useCartStore(state => state.items);
  const total = useCartStore(state => state.total);
  const clearCart = useCartStore(state => state.clear);

  // Show consistent state until hydrated
  const displayItems = isHydrated ? items : [];
  const displayTotal = isHydrated ? total() : 0;

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    customer_note: ""
  });

  const [submitting, setSubmitting] = useState(false);

  async function submitEnquiry() {
    if (!form.name || !form.phone) {
      alert("Please enter your name and mobile number");
      return;
    }

    if (!displayItems.length) {
      alert("Your cart is empty");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/enquiry/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          address: form.address,
          pincode: form.pincode,
          customer_note: form.customer_note,
          items
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed");
      }

      alert("Enquiry submitted successfully");
      clearCart();
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Failed to submit enquiry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.page}>
        <h1>Send Enquiry</h1>

        {displayItems.length === 0 ? (
          <p className={styles.empty}>
            Your cart is empty. Please add products first.
          </p>
        ) : (
          <div className={styles.layout}>
            {/* FORM */}
            <section className={styles.form}>
              <h2>Your Details</h2>

              <input
                placeholder="Full Name *"
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                placeholder="Mobile Number *"
                value={form.phone}
                onChange={e =>
                  setForm({ ...form, phone: e.target.value })
                }
              />

              <textarea
                placeholder="Delivery Address"
                rows={4}
                value={form.address}
                onChange={e =>
                  setForm({ ...form, address: e.target.value })
                }
              />

              <input
                placeholder="Pincode"
                value={form.pincode}
                onChange={e =>
                  setForm({ ...form, pincode: e.target.value })
                }
              />

              {/* ⭐ CUSTOMER NOTE */}
              <div className={styles.noteBox}>
                <label>Special Instructions (Optional)</label>

                <textarea
                  rows={3}
                  placeholder="Eg: Dedicated to my daughter 👧 | Please pack separately | Call before delivery"
                  value={form.customer_note}
                  onChange={e =>
                    setForm({
                      ...form,
                      customer_note: e.target.value
                    })
                  }
                />
              </div>

              <p className={styles.note}>
                * Online payments are not accepted as per Tamil Nadu
                regulations. Orders are processed via enquiry only.
              </p>

              <button
                onClick={submitEnquiry}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Enquiry"}
              </button>
            </section>

            {/* SUMMARY */}
            <aside className={styles.summary}>
              <h2>Order Summary</h2>
              
              <div className={styles.summaryStats}>
                <div className={styles.stat}>
                  <span>Total Items:</span>
                  <strong>{displayItems.reduce((sum, item) => sum + item.qty, 0)}</strong>
                </div>
                <div className={styles.stat}>
                  <span>Product Types:</span>
                  <strong>{displayItems.length}</strong>
                </div>
              </div>

              <div className={styles.itemsList}>
                {displayItems.map(item => (
                  <div key={item.id} className={styles.summaryItem}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName} title={item.name}>
                        {item.name}
                      </span>
                      <span className={styles.itemQty}>× {item.qty}</span>
                    </div>
                    <span className={styles.itemTotal}>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>

              <div className={styles.total}>
                <span>Total Amount</span>
                <strong>₹{displayTotal}</strong>
              </div>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

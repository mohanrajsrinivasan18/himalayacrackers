import Header from "@/components/layout/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import styles from "./policies.module.scss";

export default function CancellationRefundPage() {
  return (
    <>
      <SEO
        title="Cancellation & Refund Policy | Himalaya Crackers"
        description="Learn about our cancellation and refund policy. We trust you and respect your decision with flexible refund options."
      />

      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1>Cancellation & Refund Policy</h1>
            <p>We trust you and respect your decision. Contact us at +91 9788233556 or himalayacrackers23@gmail.com</p>
          </div>

          <div className={styles.content}>
            <div className={styles.tableSection}>
              <h2>Refund Breakdown</h2>
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>S.No</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Refund %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Cancellation Stage I</td>
                      <td>Order Made & Didn't Pack</td>
                      <td><span className={styles.refundBadge}>95%</span></td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Cancellation Stage II</td>
                      <td>Order Made & We packed</td>
                      <td><span className={styles.refundBadge}>90%</span></td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Cancellation Stage III</td>
                      <td>Order Made & We have put the parcel on transportation</td>
                      <td><span className={styles.refundBadge}>60%</span></td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Cancellation Stage IV</td>
                      <td>Order Made & Parcel reached your city</td>
                      <td><span className={styles.refundBadge}>50%</span></td>
                    </tr>
                    <tr>
                      <td>5</td>
                      <td>Returning Type I</td>
                      <td>Received your parcel in a damaged condition</td>
                      <td><span className={styles.refundBadge}>10%</span></td>
                    </tr>
                    <tr>
                      <td>6</td>
                      <td>Returning Type II</td>
                      <td>Received your parcel with mismatching quantity of crackers</td>
                      <td><span className={styles.refundBadge}>100%</span></td>
                    </tr>
                    <tr>
                      <td>7</td>
                      <td>Returning Type III</td>
                      <td>Received your parcel and the crackers are not in good quality</td>
                      <td><span className={styles.refundBadge}>90%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.notesSection}>
              <h2>Important Notes</h2>
              <div className={styles.notesList}>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>📸</span>
                  <p>Returning of crackers requires image and video proof sent to +91 9788233556 via WhatsApp or email</p>
                </div>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>📦</span>
                  <p>For returns, you must send back the parcel to our Sivakasi address at your own cost</p>
                </div>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>💳</span>
                  <p>Refunds will be credited within 15 working days after Diwali celebration</p>
                </div>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>📍</span>
                  <p>We are not responsible for address or phone number mistakes at your end</p>
                </div>
                <div className={styles.note}>
                  <span className={styles.noteIcon}>📋</span>
                  <p>All packages are water, scratch proof & sanitized</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
import { useEffect, useState } from "react";
import styles from "./EnquiryTimeline.module.scss";

export default function EnquiryTimeline({ enquiryId }) {
  const [events, setEvents] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    async function load() {
      const res = await fetch(
        `/api/admin/enquiries/activity?enquiry_id=${enquiryId}`
      );
      const data = await res.json();
      setEvents(Array.isArray(data) ? data : []);
    }

    load();
  }, [open, enquiryId]);

  return (
    <div className={styles.wrapper}>
      <button
        className={styles.toggle}
        onClick={() => setOpen(v => !v)}
      >
        {open ? "Hide Activity" : "View Activity"}
      </button>

      {open && (
        <div className={styles.timeline}>
          {events.length === 0 && (
            <p className={styles.empty}>No activity yet</p>
          )}

          {events.map(e => (
            <div key={e.id} className={styles.event}>
              <span className={styles.dot} />
              <div>
                <strong>{formatAction(e.action)}</strong>
                <div className={styles.time}>
                  {new Date(e.created_at).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatAction(action) {
  return action
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase());
}

import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "./AdminEnquiries.module.scss";
import useUserRole from "@/lib/useUserRole";
import EnquiryItemsModal from "@/components/admin/EnquiryItemsModal";
import EnquiryRow from "@/components/admin/EnquiryRow";

const STATUS_OPTIONS = [
  "RECEIVED",
  "CONTACTED",
  "NOT_REACHABLE",
  "IN_TRANSIT",
  "PAID",
  "DELIVERED"
];

export default function AdminEnquiries() {
  const role = useUserRole();

  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [timeFilter, setTimeFilter] = useState("");

  useEffect(() => {
    loadEnquiries();
  }, []);

    async function loadEnquiries() {
      setLoading(true);
      const res = await fetch("/api/admin/enquiries/list");
      const data = await res.json();

      const enriched = (Array.isArray(data) ? data : []).map(e => ({
        ...e,
        original_status: e.status
      }));

      setEnquiries(enriched);
      setLoading(false);
    }

  async function saveItems(enquiryId, items) {
    const res = await fetch("/api/admin/enquiries/update-items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enquiry_id: enquiryId, items })
    });

    const data = await res.json();
    if (!res.ok) {
      alert(data.error || "Failed to save items");
      return;
    }
    loadEnquiries();
  }

  async function updateEnquiry(enquiry) {
    setSavingId(enquiry.id);

    const res = await fetch("/api/admin/enquiries/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        enquiry_id: enquiry.id,
        status: enquiry.status,
        admin_note: enquiry.admin_note
      })
    });

    const data = await res.json();
    setSavingId(null);

    if (!res.ok) {
      alert(data.error || "Failed to update enquiry");
      return;
    }

    loadEnquiries();
  }
const now = Date.now();

const filtered = enquiries.filter(e => {
  const q = search.toLowerCase();

  const matchesSearch =
    e.customer_name?.toLowerCase().includes(q) ||
    e.phone?.includes(q);

  const matchesStatus = statusFilter
    ? e.status === statusFilter
    : true;

  const matchesTime =
    !timeFilter ||
    (() => {
      const created = new Date(e.created_at).getTime();
      if (timeFilter === "12h") return now - created <= 12 * 60 * 60 * 1000;
      if (timeFilter === "24h") return now - created <= 24 * 60 * 60 * 1000;
      if (timeFilter === "7d") return now - created <= 7 * 24 * 60 * 60 * 1000;
      if (timeFilter === "30d") return now - created <= 30 * 24 * 60 * 60 * 1000;
      return true;
    })();

  return matchesSearch && matchesStatus && matchesTime;
});


    const statusCounts = enquiries.reduce((acc, e) => {
    acc[e.status] = (acc[e.status] || 0) + 1;
    acc.ALL = (acc.ALL || 0) + 1;
    return acc;
  }, {});


  return (
    <AdminLayout>
      <h1 className={styles.title}>Enquiries</h1>
      <div className={styles.summaryBar}>
        <strong>
          Showing {filtered.length} / {enquiries.length} enquiries
        </strong>
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className={styles.toolbar}>
        <input
          placeholder="Search by name or phone"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

          <select
            value={timeFilter}
            onChange={e => setTimeFilter(e.target.value)}
          >
            <option value="">All Time</option>
            <option value="12h">Last 12 Hours</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </select>
      </div>

      {/* <input
        type="date"
        value={fromDate}
        onChange={e => setFromDate(e.target.value)}
      />

      <input
        type="date"
        value={toDate}
        onChange={e => setToDate(e.target.value)}
      /> */}

      <div className={styles.chips}>
          <button
            className={!statusFilter ? styles.activeChip : ""}
            onClick={() => setStatusFilter("")}
          >
            All ({statusCounts.ALL || 0})
          </button>

          {STATUS_OPTIONS.map(status => (
            <button
              key={status}
              className={
                statusFilter === status ? styles.activeChip : ""
              }
              onClick={() => setStatusFilter(status)}
            >
              {status} ({statusCounts[status] || 0})
            </button>
          ))}
      </div>

      {loading ? (
        <p>Loading enquiries…</p>
      ) : filtered.length === 0 ? (
        <p>No enquiries found.</p>
      ) : (
        <div className={styles.listContainer}>
          {/* Header Row */}
          <div className={styles.headerRow}>
            <div className={styles.headerCell}>Order #</div>
            <div className={styles.headerCell}>Customer</div>
            <div className={styles.headerCell}>Order Value</div>
            <div className={styles.headerCell}>Payment</div>
            <div className={styles.headerCell}>Status</div>
            <div className={styles.headerCell}>Created</div>
            <div className={styles.headerCell}></div>
          </div>
          
          <div className={styles.list}>
            {filtered.map(e => (
              <EnquiryRow
                key={e.id}
                enquiry={e}
                onUpdate={(id, updates, shouldSave) => {
                  if (shouldSave) {
                    // Find the enquiry and save it
                    const enquiry = enquiries.find(x => x.id === id);
                    if (enquiry) updateEnquiry(enquiry);
                  } else {
                    // Just update the state
                    setEnquiries(prev =>
                      prev.map(x =>
                        x.id === id ? { ...x, ...updates } : x
                      )
                    );
                  }
                }}
                onSaveItems={saveItems}
                savingId={savingId}
                setActiveEnquiry={setActiveEnquiry}
              />
            ))}
          </div>
        </div>
      )}

      {/* PRODUCT MODAL */}
      {activeEnquiry && (
        <EnquiryItemsModal
          enquiry={activeEnquiry}
          onClose={() => setActiveEnquiry(null)}
          onSave={async items => {
            await fetch("/api/admin/enquiries/update-items", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                enquiry_id: activeEnquiry.id,
                items
              })
            });
            setActiveEnquiry(null);
            loadEnquiries();
          }}
        />
      )}
    
    </AdminLayout>
  );
}

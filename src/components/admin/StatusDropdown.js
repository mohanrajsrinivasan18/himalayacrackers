import { useState, useRef, useEffect } from "react";
import styles from "./StatusDropdown.module.scss";

const STATUS_OPTIONS = [
  { value: "RECEIVED", label: "Received", color: "#3b82f6" },
  { value: "CONTACTED", label: "Contacted", color: "#f59e0b" },
  { value: "NOT_REACHABLE", label: "Not Reachable", color: "#ef4444" },
  { value: "IN_TRANSIT", label: "In Transit", color: "#8b5cf6" },
  { value: "PAID", label: "Paid", color: "#10b981" },
  { value: "DELIVERED", label: "Delivered", color: "#6b7280" }
];

export default function StatusDropdown({ value, onChange, disabled = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentStatus = STATUS_OPTIONS.find(s => s.value === value);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (statusValue) => {
    onChange(statusValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <button
        className={`${styles.trigger} ${disabled ? styles.disabled : ""}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        style={{ "--status-color": currentStatus?.color }}
      >
        <div className={styles.statusDisplay}>
          <div 
            className={styles.statusDot}
            style={{ backgroundColor: currentStatus?.color }}
          />
          <span className={styles.statusLabel}>
            {currentStatus?.label || value}
          </span>
        </div>
        {!disabled && (
          <div className={`${styles.chevron} ${isOpen ? styles.open : ""}`}>
            ▼
          </div>
        )}
      </button>

      {isOpen && !disabled && (
        <div className={styles.menu}>
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status.value}
              className={`${styles.option} ${
                status.value === value ? styles.selected : ""
              }`}
              onClick={() => handleSelect(status.value)}
            >
              <div 
                className={styles.optionDot}
                style={{ backgroundColor: status.color }}
              />
              <span className={styles.optionLabel}>{status.label}</span>
              {status.value === value && (
                <div className={styles.checkmark}>✓</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
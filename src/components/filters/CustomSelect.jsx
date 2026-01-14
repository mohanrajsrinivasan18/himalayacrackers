import { useState, useRef, useEffect } from 'react';
import styles from './CustomSelect.module.scss';

export default function CustomSelect({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');
  const dropdownRef = useRef(null);

  useEffect(() => {
    const selected = options.find(opt => opt.value === value);
    setSelectedLabel(selected ? selected.label : placeholder);
  }, [value, options, placeholder]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={styles.customSelect} ref={dropdownRef}>
      <button
        className={`${styles.selectButton} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        type="button"
      >
        <span className={styles.selectedText}>{selectedLabel}</span>
        <span className={`${styles.arrow} ${isOpen ? styles.rotated : ''}`}>
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path 
              stroke="currentColor" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M6 8l4 4 4-4"
            />
          </svg>
        </span>
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.option} ${value === option.value ? styles.selected : ''}`}
              onClick={() => handleSelect(option.value)}
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default function Topbar({ onMenuClick }) {
  return (
    <header className="topbar">
      <div className="topbar-content">
        <div className="topbar-left">
          <button 
            className="menu-btn"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            ☰
          </button>
          <h1>Himalaya Crackers Admin</h1>
        </div>
        <div className="user-info">
          <span>Admin User</span>
        </div>
      </div>
      
      <style jsx>{`
        .topbar {
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
          padding: 0 24px;
          position: sticky;
          top: 0;
          z-index: 10;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .topbar-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 64px;
        }
        
        .topbar-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        
        .menu-btn {
          display: none;
          background: none;
          border: none;
          font-size: 1.25rem;
          color: #6b7280;
          cursor: pointer;
          padding: 8px;
          border-radius: 6px;
          transition: all 0.2s ease;
          min-width: 40px;
          height: 40px;
        }
        
        .menu-btn:hover {
          background: #f3f4f6;
          color: #dc2626;
        }
        
        .menu-btn:active {
          background: #e5e7eb;
        }
        
        .topbar h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        @media (max-width: 768px) {
          .topbar {
            padding: 0 16px;
          }
          
          .menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          
          .topbar h1 {
            font-size: 1.125rem;
          }
          
          .user-info {
            display: none;
          }
        }
        
        @media (max-width: 480px) {
          .topbar {
            padding: 0 12px;
          }
          
          .topbar h1 {
            font-size: 1rem;
          }
          
          .topbar-left {
            gap: 12px;
          }
          
          .menu-btn {
            min-width: 36px;
            height: 36px;
            font-size: 1.125rem;
          }
        }
      `}</style>
    </header>
  );
}
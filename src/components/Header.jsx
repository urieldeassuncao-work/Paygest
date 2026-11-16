import {
  Search,
  Bell,
  CalendarDays
} from "lucide-react";

function Header() {
  return (
    <header className="header">

      <div className="global-search">
        <Search size={20} />

        <input
          type="text"
          placeholder="Pesquisar por referência, pagador, beneficiário..."
        />
      </div>

      <div className="header-actions">

        <button className="notification">
          <Bell size={21} />
          <span>3</span>
        </button>

        <button className="date-button">
          <CalendarDays size={18} />
          29/09/2025 - 29/10/2025
        </button>

      </div>

    </header>
  );
}

export default Header;
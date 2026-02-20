import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Expert Booking
      </div>

      <div className="navbar-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/my-bookings"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          My Bookings
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
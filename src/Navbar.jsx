import { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faRightFromBracket,
  faRightToBracket,
  faUser,
  faBoxOpen,
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "./store/LoginSlice";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const closeTimerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { user, isLoggedIn } = useSelector((state) => state.userLogin);
  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);


const handleMouseEnter = () => {
  clearTimeout(closeTimerRef.current);
  setDropdownOpen(true);
};

const handleMouseLeave = () => {
  closeTimerRef.current = setTimeout(() => setDropdownOpen(false), 200);
};

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    setMenuOpen(false);
  };

  const initials = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <header className="ch-header">
      <nav className="ch-nav">
        <div className="ch-nav-inner">

          {/* Logo */}
          <NavLink className="ch-brand" to="/" onClick={() => setMenuOpen(false)}>
            <img src="/logo-cafe.jpg" alt="Cafe Horizon" className="ch-logo" />
          </NavLink>

          {/* Desktop Links — hidden on mobile */}
          <div className="ch-links">
            <NavLink to="/" className={({ isActive }) => `ch-link ${isActive ? "active" : ""}`}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </NavLink>

            <NavLink to="/menu" className={({ isActive }) => `ch-link ${isActive ? "active" : ""}`}>
              Menu
            </NavLink>

            <NavLink to="/cart" className={({ isActive }) => `ch-link ch-cart ${isActive ? "active" : ""}`}>
              <FontAwesomeIcon icon={faCartShopping} />
              {cartCount > 0 && <span className="ch-badge">{cartCount}</span>}
            </NavLink>

            <div className="ch-divider" />

            {/* Profile Dropdown */}
            <div
                className="ch-profile-wrap"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
              <button className="ch-profile-btn">
                <div className="ch-avatar">{initials}</div>
                <span>{isLoggedIn && user ? user.name?.split(" ")[0] : "Account"}</span>
                <FontAwesomeIcon icon={faChevronDown} className="ch-chevron" />
              </button>

              {dropdownOpen && (
                <div className="ch-dropdown">
                  {isLoggedIn && user ? (
                    <>
                      <NavLink className="ch-drop-item" to="/profile" onClick={() => setDropdownOpen(false)}>
                        <FontAwesomeIcon icon={faUser} /> My Profile
                      </NavLink>
                      <NavLink className="ch-drop-item" to="/orders" onClick={() => setDropdownOpen(false)}>
                        <FontAwesomeIcon icon={faBoxOpen} /> My Orders
                      </NavLink>
                      <hr className="ch-drop-divider" />
                      <button className="ch-drop-item ch-logout" onClick={handleLogout}>
                        <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                      </button>
                    </>
                  ) : (
                    <NavLink className="ch-drop-item" to="/login" onClick={() => setDropdownOpen(false)}>
                      <FontAwesomeIcon icon={faRightToBracket} /> Login
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger — mobile only */}
          <button className="ch-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>

        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="ch-mobile-menu">
            <NavLink to="/" className={({ isActive }) => `ch-mob-link ${isActive ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faHouse} /> Home
            </NavLink>
            <NavLink to="/menu" className={({ isActive }) => `ch-mob-link ${isActive ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              Menu
            </NavLink>
            <NavLink to="/cart" className={({ isActive }) => `ch-mob-link ${isActive ? "active" : ""}`} onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faCartShopping} /> Cart {cartCount > 0 && `(${cartCount})`}
            </NavLink>
            <hr className="ch-drop-divider" />
            {isLoggedIn && user ? (
              <>
                <NavLink to="/profile" className="ch-mob-link" onClick={() => setMenuOpen(false)}>
                  <FontAwesomeIcon icon={faUser} /> My Profile
                </NavLink>
                <NavLink to="/orders" className="ch-mob-link" onClick={() => setMenuOpen(false)}>
                  <FontAwesomeIcon icon={faBoxOpen} /> My Orders
                </NavLink>
                <button className="ch-mob-link ch-logout" onClick={handleLogout}>
                  <FontAwesomeIcon icon={faRightFromBracket} /> Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" className="ch-mob-link" onClick={() => setMenuOpen(false)}>
                <FontAwesomeIcon icon={faRightToBracket} /> Login
              </NavLink>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
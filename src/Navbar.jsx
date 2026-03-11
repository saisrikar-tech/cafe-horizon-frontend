import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faCartShopping,
  faUser,
  faRightToBracket,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { logout } from "./store/LoginSlice";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn } = useSelector((state) => state.userLogin);

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container">

          {/* Logo */}
          <NavLink className="navbar-brand" to="/">
            <img src="logo-cafe.jpg" alt="Cafe Logo" width="120" />
          </NavLink>

          {/* Mobile Toggle Button */}
          <button
            className="navbar-toggler navbar-toggler-btn"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">

              {/* Home */}
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Home <FontAwesomeIcon icon={faHouse} />
                </NavLink>
              </li>

              {/* Menu */}
              <li className="nav-item">
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  Menu
                </NavLink>
              </li>

              {/* Cart */}
              <li className="nav-item">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active" : ""}`
                  }
                >
                  <FontAwesomeIcon icon={faCartShopping} />
                  {cartCount > 0 && (
                    <span className="badge bg-white text-dark ms-1">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>

              {/* Profile Dropdown (Fully inside mobile collapse) */}
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FontAwesomeIcon icon={faUser} size="lg" />
                </NavLink>

                <ul className="dropdown-menu dropdown-menu-end">

                  {isLoggedIn && user ? (
                    <>
                      <li>
                        <NavLink className="dropdown-item" to="/profile">
                          My Profile
                        </NavLink>
                      </li>

                      <li><hr className="dropdown-divider" /></li>

                      <li>
                        <NavLink className="dropdown-item" to="/orders">
                          My Orders
                        </NavLink>
                      </li>

                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={handleLogout}
                        >
                          Logout <FontAwesomeIcon icon={faRightFromBracket} />
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <NavLink className="dropdown-item" to="/login">
                          Login <FontAwesomeIcon icon={faRightToBracket} />
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </li>

            </ul>
          </div>

        </div>
      </nav>
    </header>
    </>
  );
}

export default Navbar;

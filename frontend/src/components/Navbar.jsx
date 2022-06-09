import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
function Navbar() {
  const [active, setActive] = useState();

  return (
    <div className="navbar">
      <ul className="navbar-items">
        <li>
          <NavLink
            to="/staff/home"
            className={`navbar-item btn btn-reverse btn-small`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="dashboard"
            className={`navbar-item btn btn-reverse btn-small`}
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to="user-management"
            className={`navbar-item btn btn-reverse btn-small `}
          >
            User Management
          </NavLink>
        </li>
        <li>
          <NavLink to="/" className={`navbar-item btn btn-reverse btn-small `}>
            Documentation
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;

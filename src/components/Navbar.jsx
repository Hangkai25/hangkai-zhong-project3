import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/games">Games</Link>
        </li>

        <li>
          <Link to="/scores">High Scores</Link>
        </li>

        <li>
          <Link to="/rules">Rules</Link>
        </li>

        {/* 右侧匿名用户下拉 */}
        <li
          className="nav-user"
          onClick={() => setOpen(o => !o)}
        >
          <span className="username">
            👤 anonymous ▾
          </span>

          {open && (
            <ul className="user-dropdown">
              <li className="dropdown-item disabled">
                Settings (N/A)
              </li>
              <li
                className="dropdown-item logout"
                onClick={(e) => {
                  e.stopPropagation();
                  // 什么都不做
                  alert("Logged out (not really)");
                  setOpen(false);
                }}
              >
                Log out
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
}

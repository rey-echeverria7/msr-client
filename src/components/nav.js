import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import "../App.css";

function Nav() {
  const { token, logout } = useContext(AuthContext); // Get logout from context

  return (
    <div>
      <header className="header">
        <div className="logo">
          <Link to="/">
            <img src="msr_logo.PNG" alt="MSR Logo" />
          </Link>
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/listaRefacciones">Refacciones</Link>
            </li>
            <li>
              <Link to="/">Nosotros</Link>
            </li>
            <li>
              {token ? (
                <Link
                  onClick={() => {
                    logout(); // Call logout from context
                  }}
                  style={{ cursor: "pointer", color: "#ffbc0e" }}
                >
                  Cerrar Sesión
                </Link>
              ) : (
                <Link to="/login">Iniciar Sesion</Link>
              )}
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;

import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

function Nav() {
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
              <Link to="/login">Iniciar Sesion</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Nav;

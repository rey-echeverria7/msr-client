import React from "react";
import Nav from "./components/nav";
import Login from "./pages/login";
import Home from "./pages/Home";
import { ListaRefacciones } from "./pages/Refacciones/Refacciones";
import { AgregarRefaccion } from "./pages/Refacciones/agregarRefaccion";
import { ActualizarRefaccion } from "./pages/Refacciones/actualizarRefaccion";
import { VistaRefaccion } from "./pages/Refacciones/vistaRefaccion";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/listaRefacciones"
            element={<ListaRefacciones />}
          ></Route>
          <Route
            path="/agregarRefaccion"
            element={<AgregarRefaccion />}
          ></Route>
          <Route
            path="/vistaRefaccion/:id"
            element={<VistaRefaccion />}
          ></Route>
          <Route
            path="/actualizarRefaccion/:id"
            element={<ActualizarRefaccion />}
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

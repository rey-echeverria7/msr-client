import Nav from "./components/nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export function ListaRefacciones() {
  const [refacciones, setRefacciones] = useState([]);

  const getRefacciones = async () => {
    await axios
      .get("http://localhost:8000/refacciones/api/v1/refacciones")
      .then((res) => {
        setRefacciones(res.data);
      });
  };

  useEffect(() => {
    getRefacciones();
  }, []);

  console.log(refacciones);
  return (
    <>
      <h2>Lista de Refacciones</h2>
      <div className="listaRefacciones">
        {refacciones.map((refaccion) => (
          <Refaccion refaccion={refaccion} />
        ))}
      </div>
    </>
  );
}

export function Refaccion({ refaccion }) {
  return (
    <div className="refaccionCard">
      <img src={refaccion.imagePath} alt="" />
      <CardDescription refaccion={refaccion} />
    </div>
  );
}

export function CardDescription({ refaccion }) {
  return (
    <div className="cardDescription">
      <p>{refaccion.nombre}</p>
      <p className="priceTag">${refaccion.precio}</p>
      <p>{refaccion.codigo}</p>
    </div>
  );
}

export function Home() {
  return <h1>Home</h1>;
}

export default App;

import Nav from "./components/nav";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { crearRefaccion } from "./api/refacciones.api";
import { useNavigate } from "react-router-dom";

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
      <div className="headerLista">
        <h1>Refacciones</h1>
        <Button />
      </div>

      <div className="listaRefacciones">
        {refacciones.map((refaccion) => (
          <Refaccion refaccion={refaccion} key={refaccion.id} />
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

export function AgregarRefaccion() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const navigate = useNavigate();

  /*  function handleSubmit(e) {
    e.preventDefault();

    const refaccion = {
      codigo: codigo,
      nombre: nombre,
      descripcion: descripcion,
      imagePath: nombreImagen,
    };

    crearRefaccion(refaccion);

    setCodigo("");
    setNombre("");
    setDescripcion("");
    setNombreImagen("");

    navigate("/listaRefacciones");
  } */
  function getFileName(filePath) {
    return filePath.split("\\").pop();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const img = getFileName(nombreImagen);
      console.log("Nombre: " + img);
      // Create the refaccion object
      const refaccion = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        imagePath: "static/" + img,
      };

      const newRefaccion = JSON.stringify(refaccion);
      console.log(newRefaccion);
      // Call crearRefaccion and wait for it to complete
      await crearRefaccion(newRefaccion);

      // Clear form fields
      setCodigo("");
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setNombreImagen("");

      // Navigate to another page
      navigate("/listaRefacciones");
    } catch (error) {
      // Handle errors here
      console.error("Error creating refaccion:", error);
      alert("Failed to create refaccion. Please try again.");
    }
  };
  return (
    <div className="agregarRefaccion">
      <form onSubmit={handleSubmit}>
        <label>Codigo</label>
        <input
          type="text"
          placeholder="Código refacción"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />

        <label>Nombre</label>
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label>Precio</label>
        <input
          type="text"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />

        <label>Descripción</label>
        <textarea
          cols="30"
          rows="5"
          placeholder="Descripcion de la refaccion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        ></textarea>
        <input
          type="file"
          value={nombreImagen}
          onChange={(e) => setNombreImagen(e.target.value)}
        ></input>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export function Button() {
  return (
    <Link to="/agregarRefaccion">
      <button className="button">Agregar</button>
    </Link>
  );
}

export default App;

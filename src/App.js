import Nav from "./components/nav";
import Login from "./pages/login";
import AuthProvider from "./auth/AuthProvider";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  crearRefaccion,
  eliminarRefaccion,
  actualizarRefaccion,
  obtenerRefaccion,
} from "./api/refacciones.api";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

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

export function ListaRefacciones() {
  const [refacciones, setRefacciones] = useState([]);

  const getRefacciones = async () => {
    await axios.get("http://localhost:5157/api/refaccion").then((res) => {
      setRefacciones(res.data);
    });
  };

  useEffect(() => {
    getRefacciones();
  }, []);

  console.log(refacciones);
  return (
    <>
      {/* <div className="headerLista">
        <h1>Refacciones</h1>
        <Button />
      </div> */}

      <div class="container center-text">
        <span class="subheading">Lista</span>
      </div>
      <h2 class="heading-secondary">REFACCIONES</h2>
      <div className="agregarButtonContainer">
        <Button />
      </div>

      <div className="listaRefacciones">
        {refacciones.map((refaccion) => (
          <Refaccion
            refaccion={refaccion}
            key={refaccion.id}
            onDelete={(id) =>
              setRefacciones(refacciones.filter((r) => r.id !== id))
            }
          />
        ))}
      </div>
    </>
  );
}

export function Refaccion({ refaccion, onDelete }) {
  const navigate = useNavigate();

  function handleRefaccionClick() {
    navigate(`/vistaRefaccion/${refaccion.id}`);
  }
  return (
    <div className="container" onClick={handleRefaccionClick}>
      <RefaccionCard
        refaccion={refaccion}
        onDelete={onDelete}
        navigate={navigate}
      />
    </div>
  );
}

export function RefaccionCard({ refaccion, onDelete }) {
  const navigate = useNavigate();

  function handleRefaccionClick() {
    navigate(`/actualizarRefaccion/${refaccion.id}`);
  }

  return (
    <div className="refaccion">
      <img
        src={refaccion.imagePath}
        alt={refaccion.nombre}
        className="refaccion-img"
      />
      <div className="refaccion-content">
        <div className="refaccion-tags">
          <span className="tag tag--vegetarian">{refaccion.codigo}</span>
        </div>
        <p className="refaccion-title">{refaccion.nombre}</p>
        <p className="refaccion-precio">${refaccion.precio}</p>
      </div>

      <div className="buttonContainerRefaccion">
        <button
          className="buttonDelete"
          onClick={async (e) => {
            e.stopPropagation(); // Prevents the card click event
            const accepted = window.confirm(
              "¿Esta seguro que quiere eliminar?"
            );
            if (accepted) {
              await eliminarRefaccion(refaccion.id);
              onDelete(refaccion.id); // Call onDelete to update the state
              navigate("/listaRefacciones");
            }
          }}
        >
          Eliminar
        </button>

        <button
          className="updateButton"
          onClick={(e) => {
            e.stopPropagation(); // Prevents the card click event
            handleRefaccionClick();
          }}
        >
          Modificar
        </button>
      </div>
    </div>
  );
}
/*
export function CardDescription({ refaccion }) {
  return (
    <div className="cardDescription">
      <p>{refaccion.nombre}</p>
      <p className="priceTag">${refaccion.precio}</p>
      <p>{refaccion.codigo}</p>
    </div>
  );
}
  */

export function Home() {
  return (
    <section class="section-hero">
      <div className="hero">
        <div className="hero-text-box">
          <h1 className="heading-primary">
            Mecanicos hay muchos. <br></br>Con experiencia pocos. <br></br>Como
            nosotros ninguno.
          </h1>

          <p className="hero-description">
            Taller mecánico y venta de refacciones dedicado al mantenimiento y
            reparación de motocicletas de trabajo. <br></br>
            <br></br> Tabasco 1246 entre Aureliano Anaya y Flavio Borquez,
            Colonia Campestre, Ciudad Obregón, Mexico
          </p>
          <a href="#" className="btn btn--full margin-right-sm">
            Contacto
          </a>
          <a href="#" className="btn btn--outline">
            motoservicioruelas@gmail.com &darr;
          </a>
        </div>
        <div className="hero-img-box">
          <img src="static/hero2.jpg" className="hero-img" alt="Taller" />
        </div>
      </div>
    </section>
  );
}

export function AgregarRefaccion() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const [compatibles, setCompatibles] = useState("");

  const navigate = useNavigate();

  function getFileName(filePath) {
    return filePath.split("\\").pop();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const img = getFileName(nombreImagen);
      //console.log("Nombre: " + img);
      // Create the refaccion object
      const refaccion = {
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        descripcion: descripcion,
        compatibles: compatibles,
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
      setCompatibles("");

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
        <label>Motocicletas compatibles</label>
        <textarea
          cols="30"
          rows="5"
          placeholder="Lista de motocicletas compatibles"
          value={compatibles}
          onChange={(e) => setCompatibles(e.target.value)}
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

export function ActualizarRefaccion() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const [compatibles, setCompatibles] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  let imageName = "";

  //console.log(nombreImagen);

  useEffect(() => {
    async function loadRefaccion() {
      const ref = await obtenerRefaccion(id).then();
      //console.log(ref.data);
      setCodigo(ref.data.codigo);
      setNombre(ref.data.nombre);
      setPrecio(ref.data.precio);
      setDescripcion(ref.data.descripcion);
      setCompatibles(ref.data.compatibles);
      imageName = ref.data.imageName;
    }

    loadRefaccion();
  }, []);

  function getFileName(filePath) {
    return filePath.split("\\").pop();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const img = getFileName(nombreImagen);
      /* console.log("Nombre: " + img); */
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
      // Call actualizarRefaccion and wait for it to complete
      await actualizarRefaccion(id, newRefaccion);

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
      console.error("Error updating refaccion:", error);
      alert("Failed to update refaccion. Please try again.");
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

        <label>Motocicletas compatibles</label>

        <textarea
          cols="30"
          rows="5"
          placeholder="Lista de motocicletas compatibles"
          value={compatibles}
          onChange={(e) => setCompatibles(e.target.value)}
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

export function VistaRefaccion() {
  const [refaccion, setRefaccion] = useState({});
  const { id } = useParams();

  const getRefaccion = async () => {
    var res = await obtenerRefaccion(id);
    setRefaccion(res.data);
    console.log("Refaccion: " + JSON.stringify(res.data));
  };

  useEffect(() => {
    getRefaccion();
  }, []);

  return (
    <div>
      {refaccion ? (
        <div className="vistaRefaccion">
          <div className="imageContainer">
            <img src={`${process.env.PUBLIC_URL}/${refaccion.imagePath}`} />
          </div>

          <div className="refaccionInfo">
            <h1>{refaccion.nombre}</h1>
            <p className="priceTagView">${refaccion.precio}</p>
            <p>{refaccion.descripcion}</p>
          </div>
        </div>
      ) : (
        <p>No refaccion data available.</p>
      )}
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

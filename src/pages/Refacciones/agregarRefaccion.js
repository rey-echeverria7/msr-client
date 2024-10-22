import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { crearRefaccion } from "../../api/refacciones.api";
import { Navigate, useNavigate } from "react-router-dom";

export function AgregarRefaccion() {
  const [codigo, setCodigo] = useState("");
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [nombreImagen, setNombreImagen] = useState("");
  const [compatibles, setCompatibles] = useState("");
  const { token, loading } = useContext(AuthContext);

  const navigate = useNavigate();

  if (loading) {
    return null; // Optionally show a loading spinner or message
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

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
      await crearRefaccion(newRefaccion, token);

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

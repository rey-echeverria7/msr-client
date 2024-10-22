import React from "react";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../auth/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { eliminarRefaccion } from "../../api/refacciones.api";
import { Link } from "react-router-dom";

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
  const { token } = useContext(AuthContext);

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
      {token ? (
        <div className="buttonContainerRefaccion">
          <button
            className="buttonDelete"
            onClick={async (e) => {
              e.stopPropagation(); // Prevents the card click event
              const accepted = window.confirm(
                "¿Esta seguro que quiere eliminar?"
              );
              if (accepted) {
                await eliminarRefaccion(refaccion.id, token);
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
      ) : null}
    </div>
  );
}

export function ListaRefacciones() {
  const { token, loading } = useContext(AuthContext);
  const [refacciones, setRefacciones] = useState([]);

  useEffect(() => {
    const getRefacciones = async () => {
      try {
        const res = await axios.get("http://localhost:5157/api/refaccion", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setRefacciones(res.data);
      } catch (error) {
        console.error("Error fetching refacciones:", error);
      }
    };

    if (!loading && token) {
      getRefacciones();
    }
  }, [loading, token]);

  if (loading) {
    return null; // Optionally show a loading spinner or message
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="container center-text">
        <span className="subheading">Lista</span>
      </div>
      <h2 className="heading-secondary">REFACCIONES</h2>
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

export function Button() {
  return (
    <Link to="/agregarRefaccion">
      <button className="button">Agregar</button>
    </Link>
  );
}

import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { obtenerRefaccion } from "../../api/refacciones.api";
import { useParams } from "react-router-dom";

export function VistaRefaccion() {
  const [refaccion, setRefaccion] = useState({});
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const getRefaccion = async () => {
    try {
      const res = await obtenerRefaccion(id, token);
      setRefaccion(res.data);
      console.log("Token:", token);
      console.log("Refaccion data:", refaccion);
    } catch (error) {
      console.error("Error fetching refaccion:", error);
    }
  };

  useEffect(() => {
    getRefaccion();
  }, [id, token]);

  return (
    <div>
      {Object.keys(refaccion).length > 0 ? (
        <div className="vistaRefaccion">
          <div className="imageContainer">
            <img
              src={`${window.location.origin}/${refaccion.imagePath}`}
              alt={refaccion.nombre}
            />
          </div>
          <div className="refaccionInfo">
            <h1>{refaccion.nombre}</h1>
            <div className="refaccionDescription">
              <p>{refaccion.descripcion}</p>
              <p className="priceTagView">${refaccion.precio}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>No refaccion data available.</p>
      )}
    </div>
  );
}

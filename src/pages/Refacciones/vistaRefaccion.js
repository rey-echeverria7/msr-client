import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { obtenerRefaccion } from "../../api/refacciones.api";
import { useParams } from "react-router-dom";

export function VistaRefaccion2() {
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

export function VistaRefaccion() {
  const [refaccion, setRefaccion] = useState({});
  const [compatibles, setCompatibles] = useState([]);
  const { id } = useParams();
  const { token } = useContext(AuthContext);

  const getRefaccion = async () => {
    try {
      const res = await obtenerRefaccion(id, token);
      setRefaccion(res.data);
      setCompatibles(res.data.compatibles.split(","));
      console.log("Token:", token);
      console.log("Refaccion data:", res.data);
      console.log("lista compatibles: ", compatibles);
    } catch (error) {
      console.error("Error fetching refaccion:", error);
    }
  };

  useEffect(() => {
    getRefaccion();
  }, [id, token]);

  return (
    <div className="body">
      <div className="wrapper">
        <div className="product-img">
          <img
            src={`${window.location.origin}/${refaccion.imagePath}`}
            height="420"
            width="327"
            alt={refaccion.nombre}
          />
        </div>
        <div className="product-info">
          <div className="product-text">
            <h1>{refaccion.nombre}</h1>
            <h2>{refaccion.codigo}</h2>
            <p>{refaccion.descripcion}</p>
            <h2>Compatible con:</h2>
            <div className="lista-compatibles">
              {compatibles.map((c, index) => (
                <h2 key={index}>- {c}</h2>
              ))}
            </div>
          </div>
          <div className="product-price-btn">
            <span className="span-price">${refaccion.precio}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

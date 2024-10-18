import axios from "axios";

export const crearRefaccion = (refaccion, token) => {
  return axios.post("http://localhost:5157/api/refaccion", refaccion, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const eliminarRefaccion = (id, token) => {
  return axios.delete("http://localhost:5157/api/refaccion/" + `${id}` + "/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

export const actualizarRefaccion = (id, refaccion, token) => {
  return axios.put(
    "http://localhost:5157/api/refaccion/" + `${id}` + "/",
    refaccion,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const obtenerRefaccion = (id, token) => {
  return axios.get("http://localhost:5157/api/refaccion/" + `${id}` + "/", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

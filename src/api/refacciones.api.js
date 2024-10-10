import axios from "axios";

export const crearRefaccion = (refaccion) => {
  return axios.post("http://localhost:5157/api/refaccion", refaccion, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const eliminarRefaccion = (id) => {
  return axios.delete("http://localhost:5157/api/refaccion/" + `${id}` + "/");
};

export const actualizarRefaccion = (id, refaccion) => {
  return axios.put(
    "http://localhost:5157/api/refaccion/" + `${id}` + "/",
    refaccion,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const obtenerRefaccion = (id) => {
  return axios.get("http://localhost:5157/api/refaccion/" + `${id}` + "/");
};

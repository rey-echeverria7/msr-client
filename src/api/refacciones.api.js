import axios from "axios";

export const crearRefaccion = (refaccion) => {
  return axios.post(
    "http://localhost:8000/refacciones/api/v1/refacciones/",
    refaccion,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const eliminarRefaccion = (id) => {
  return axios.delete(
    "http://localhost:8000/refacciones/api/v1/refacciones/" + `${id}` + "/"
  );
};

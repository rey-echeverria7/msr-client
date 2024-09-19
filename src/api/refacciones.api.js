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

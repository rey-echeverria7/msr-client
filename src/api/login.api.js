import axios from "axios";

export const login = (user) => {
  return axios.post("http://localhost:8000/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

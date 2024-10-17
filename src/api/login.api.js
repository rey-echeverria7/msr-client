import axios from "axios";

export const login = (user) => {
  return axios.post("http://localhost:5157/api/Users/login", user, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

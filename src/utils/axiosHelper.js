import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/graphql",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use((response) => {
  if (response.status === 200) {
    return response.data.data;
  }
});

export default api;
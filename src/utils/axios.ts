import axios from "axios";

const api = axios.create({
  baseURL: "https://momentum.redberryinternship.ge/api",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer 9e6dc4ba-812d-4c8a-89f9-f8f1ff61cc8d",
  },
});

export default api;

import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = "X-CSRFToken"
axios.defaults.xsrfCookieName = "XSRF-TOKEN"

const api = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "http://34.27.48.59/",

});

export default api;

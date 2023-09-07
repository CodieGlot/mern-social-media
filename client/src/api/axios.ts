import axios from "axios";

export default axios.create({
  baseURL: "https://codie-social-media-server.vercel.app/api",
});

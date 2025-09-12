import axios from "axios";

const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL + "/api" || "http://localhost:1337/api";

export const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    Authorization: `Bearer ${STRAPI_API_TOKEN}`,
  },
});

import httpClient from "./httpClient";
//import { apiURL } from "../config.json";

const serviceURL = `/genres`;

export function getGenres() {
  return httpClient.get(serviceURL);
}

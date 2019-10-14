import httpClient from "./httpClient";
//import { apiURL } from "../config.json";

const serviceURL = `/movies`;

function movieUrl(id) {
  return `${serviceURL}/${id}`;
}

export function getMovies() {
  return httpClient.get(serviceURL);
}

export function getMovie(id) {
  return httpClient.get(movieUrl(id));
}

export function saveMovie(movie) {
  if (movie._id) {
    const movieObj = { ...movie };
    delete movieObj._id;
    return httpClient.put(movieUrl(movie._id), movieObj);
  }
  return httpClient.post(serviceURL, movie);
}

export function deleteMovie(id) {
  return httpClient.delete(movieUrl(id));
}

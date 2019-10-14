import httpClient from "./httpClient";
//import { apiURL } from "../config.json";

const serviceURL = `/users`;

export function SaveUser(user) {
  const userObj = {
    email: user.username,
    password: user.password,
    name: user.name
  };

  return httpClient.post(serviceURL, userObj);
}

import httpClient from "./httpClient";
//import { apiURL } from "../config.json";
import jwtDecode from "jwt-decode";

const serviceURL = `/auth`;
const tokenKey = "atk";

httpClient.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpClient.post(serviceURL, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function loginWithJwt(response) {
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  getCurrentUser,
  loginWithJwt,
  getJwt
};

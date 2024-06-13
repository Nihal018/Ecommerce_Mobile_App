import axios from "axios";

const API_KEY = "AIzaSyAoKqptcX_OMYrfdum7r9He6bBV4xeJaL8";

async function authenticate(mode: string, email: string, password: string) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  const localId = response.data.localId;

  const token = response.data.idToken;

  const res = {
    localId: localId,
    token: token,
  };

  return res;
}

export function createUser(email: string, password: string) {
  return authenticate("signUp", email, password);
}

export function login(email: string, password: string) {
  return authenticate("signInWithPassword", email, password);
}

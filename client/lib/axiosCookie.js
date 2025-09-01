import axios from 'axios'

export const axiosCookie = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // kirim cookie
})
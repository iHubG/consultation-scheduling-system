// src/lib/axios.js
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Update to match your Laravel backend
  withCredentials: true, // Required for Sanctum
})

export default axiosInstance

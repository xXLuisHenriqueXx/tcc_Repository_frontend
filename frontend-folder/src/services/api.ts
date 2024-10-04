import axios from "axios";
 
// const baseURL = process.env.EXPO_PUBLIC_API_URL;
const baseURL = "http://192.168.118.183:3000"

const api = axios.create({
    baseURL,
    validateStatus: (status) => status >= 200 && status <= 500,
});

export default api;
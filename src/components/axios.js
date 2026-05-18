import axios from "axios";

const axiosInstance = axios.create({
    // baseURL: 'http://localhost:8000',
    baseURL: "http://localhost:8000",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
    },
    withCredentials: true, // This is crucial for handling cookies
});

export default axiosInstance;

import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://alert-api.ornio.xyz/api'
});

export default axiosInstance;
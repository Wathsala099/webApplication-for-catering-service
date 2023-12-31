import axios from "axios";
import './config';

//base_url
const instance = axios.create({
    //baseURL
    baseURL: window.API_URL
    // Header
    // timeout
})
export default instance;
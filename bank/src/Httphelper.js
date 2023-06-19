import axios from "axios";

const http = axios.create({
    baseURL: 'https://api-a3.onrender.com/',
    headers: {
        Accept: 'application/json',
        Content: 'application/json'
    }
})

export default http


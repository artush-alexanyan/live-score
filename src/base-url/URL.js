import axios from 'axios'

const BASE_URL = axios.create({
    baseURL: 'https://publicapi.fantamaster.it/'
})

export default BASE_URL
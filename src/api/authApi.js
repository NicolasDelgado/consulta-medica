import axios from 'axios';
import {getEnvVariables} from '../helpers';

const { VITE_API_CONSULTA } = getEnvVariables();

const authApi = axios.create({
    baseURL: VITE_API_CONSULTA
})

export default authApi;
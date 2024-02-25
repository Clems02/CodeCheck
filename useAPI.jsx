import { accountService } from '@/service/accountService';
import axios from 'axios';
import useAuth from './useAuth';

const useAPI = () => {
    const { token } = useAuth();

    const Axios = axios.create({
        baseURL: 'http://localhost:3000/api'
    })

    Axios.interceptors.request.use(req => {
        if(token) {
            req.headers.Authorization = "Bearer " + token
        }
        return req
    })

    return Axios
};

export default useAPI;
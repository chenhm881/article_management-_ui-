import axios from 'axios';
import {getCookie, getParamByName} from "./methods";
import {login} from "./users";

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use((config: any) => {
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

instance.interceptors.response.use(res => {
    let { data } = res;
    // console.log(res + data);
    return data
}, error => {
    console.log(error.message);
    if (error.response && [401,403].includes(error.response.status)) {
        login();
    }
});

export default instance

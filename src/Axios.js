//import { config } from "./../base";
import axios from "axios";
import {getPlainFrom,clearAll} from "./helper/storage";
import {TOKEN_LOCALSTORAGE_KEY} from "./constants";
import SnackbarUtils from "./helper/snackbar-function";
import intl from "./helper/intl-function";

const Axios = axios.create();

const authToken = () => 'Bearer ' + getPlainFrom(TOKEN_LOCALSTORAGE_KEY);

//Axios.defaults.baseURL = config.apiRoot;
Axios.defaults.baseURL = 'https://10.35.3.44:8083/';

Axios.interceptors.request.use(function (conf) {
  // Do something before request is sent
  conf.headers = {
    "Authorization": authToken(),
    "Content-Type": "application/json",
  }

  return conf;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

/** Handle errors */
let key;
Axios.interceptors.response.use(undefined, function (error) {
  if(error.message === 'Network Error'){
    if(!key) {
      key = SnackbarUtils.error(intl.formatMessage({
        id: "Comun.error.error_de_red",
        defaultMessage: "Sin conexión!"
      }), true);
    }
  } else if(error.response){
    SnackbarUtils.close(key);
    const {status, message} = error.response;
    if(message === 'Network Error'){
      SnackbarUtils.error(intl.formatMessage({
        id: "Comun.error.error_de_red",
        defaultMessage: "Ocurrió un problema con la red X("
      }));
    } else if (status === 500) {
      SnackbarUtils.error(intl.formatMessage({
        id: "Comun.error.error_interno",
        defaultMessage: "Ocurrió un error interno en el servicio X("
      }));
    } else if(status === 403){
      clearAll();
      window.location.href = '/login';
      SnackbarUtils.error(intl.formatMessage({
        id: "Comun.error.sesion_expirada",
        defaultMessage: "Sesión expirada! Vuelva a iniciar sesión."
      }));
    }
  }
  return Promise.reject(error);
});

export default Axios;
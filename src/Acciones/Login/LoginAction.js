import axios from 'axios'
import Cookies from 'universal-cookie'
import history from '../../Shared/createHistory';

const API_AUTH_HOST = window.API_AUTH_HOST
const cookies = new Cookies();

export const LoginAction_InicialSesion = (email, password, auth) => {

     let loginJson = {
          email: email,
          password: password
     }

     const endpoint = `${API_AUTH_HOST}/api/login`;

     axios.post(endpoint, loginJson)
          .then(response => {
               cookies.set('token', response.data.token, { path: '/' })
               return auth(true);
          }).catch(err => {
               if (err.response && err.response.status === 401) {
                    return auth(false);
               }
          })
};

export const LoginAction_CerrarSesion = () => {
     cookies.remove('token', { path: '/' });
     history.push('/Home');
}
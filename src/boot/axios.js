import Vue from "vue";
import axios from "axios";

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;
// axios.defaults.timeout = 5000;

// axios.interceptors.response.use((response) => {
//   console.log('Bilmiyorum');
//   return response;
// }, function (error) {
//     console.log('Bizim error',error.response);
//     if (error.response.status === 401) {
//             window.location.href = '/';
//             return error.response;
//         }
// });


Vue.prototype.$axios = axios;

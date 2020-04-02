import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = process.env.BASE_URL;
axios.defaults.withCredentials = true;

Vue.prototype.$axios = axios

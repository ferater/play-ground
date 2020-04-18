import axios from "axios";

export default {
  getCookie() {
    return axios({
      method: "get",
      url: "/sanctum/csrf-cookie"
    });
  },
  loginOrRegister(resource) {
    return axios({
      method: 'post',
      url: resource.url,
      data: resource.data
    })
  },
  getAuthUser() {
    return axios({
      methos:'get',
      url: '/api/user'
    })
  },
  logOut() {
    return axios({
      method: 'post',
      url: '/logout'
    })
  }
};

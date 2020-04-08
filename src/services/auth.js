import axios from "axios";

export default {
  getCookie() {
    return axios({
      method: "get",
      url: "/sanctum/csrf-cookie"
    });
  }
};

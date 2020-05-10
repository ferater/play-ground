import auth from "../../services/service-auth";
import {
  Cookies
} from "quasar";

/*** Laravel Sanctum'dan çerez çek */
export async function getCookie() {
  return await auth.getCookie().then(() => {
    console.log("getCookie (Actions, Then): Çerez Alındı");
  });
}



export function checkIsLoggedIn(context) {
  if (checkXsrfCookie() && checkSessionCookie()) {
    context.dispatch('setAuthUser');
    context.commit('setIsLoggedIn', true);
  } else {
    console.log('checkIsLoggedIn :',this.$router.currentRoute.path);
    context.commit('setIsLoggedIn', false);
    if (this.$router.currentRoute.path != '/') {
      context.dispatch('logOut');
    }
  }
}




/** Giriş yap */
export function loginOrRegister(context, resource) {
  context.dispatch("getCookie").then(() => {
    return auth
      .loginOrRegister(resource)
      .then(res => {
        localStorage.setItem('user', JSON.stringify(res.data))
        context.commit('setIsLoggedIn', true);
        this.$router.push({
          name: "dashboard"
        });
        console.log("loginOrRegister (Actions, Then):", res);
      })
      .catch(err => {
        console.log("loginOrRegister (Actions, Catch): ", err.response);
      });
  });
}


export async function setAuthUser(context) {
  let authUser = localStorage.getItem('user');
  if (authUser) {
    context.commit('setAuthUser', JSON.parse(authUser));
  }
}




export async function logOut(context) {
  return await auth.logOut().then(res => {
    console.log("logOut (Actions, Then) :", res);
    localStorage.clear();
    this.$router.push({
      name: "login"
    });
  }).catch((err) => {
    Cookies.remove('session_lifetime')
  })
}




/** XSRF-TOKEN kontrol et*/
function checkXsrfCookie() {
  const cookie = Cookies.get('XSRF-TOKEN');
  if (cookie) {
    console.log('checkXsrfCookie var');
    return true;
  } else {
    console.log('checkXsrfCookie yok');
    return false;
  }
}



/** session_lifetime kontrol et*/
function checkSessionCookie() {
  const cookie = Cookies.get('session_lifetime');
  if (cookie) {
    console.log('session_lifetime var');
    return true;
  } else {
    console.log('session_lifetime yok');
    return false;
  }
}

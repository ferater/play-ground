import auth from "../../services/service-auth";
import { Cookies } from "quasar";

/*** Laravel Sanctum'dan çerez çek */
export async function getCookie() {
  return await auth.getCookie().then(() => {
    console.log("getCookie (Actions, Then): Çerez Alındı");
  });
}

export function checkLoggedIn(context) {
  const user = localStorage.getItem("user");
  if (user) {
    console.log("checkLoggedIn: Girilmiş");
    this.$router.push({ name: "home" });
  } else {
    console.log("girilmemiş");
  }
}

/** Giriş yap */
export function loginOrRegister(context, resource) {
  context.dispatch("getCookie").then(() => {
    return auth
      .loginOrRegister(resource)
      .then(res => {
        context.dispatch("getAuthUser").then(() => {
          context.dispatch("setLocalStorageCookie");
        });
        console.log("loginOrRegister (Actions, Then):", res);
      })
      .catch(err => {
        console.log("loginOrRegister (Actions, Catch): ", err);
      });
  });
}

export async function logOut(context) {
  return await auth.logOut().then(res => {
    context.dispatch("removeLocalStorageCookie");
    context.dispatch("removeLocalStorageUser");
    console.log("logOut (Actions, Then) :", res);
  });
}

/** Giriş yapan Kullanıcı bilgisini çek */
export async function getAuthUser(context) {
  return auth
    .getAuthUser()
    .then(res => {
      context.dispatch("setLocalStorageUser", res.data);
      console.log("getAuthUser (Actions, Then) :", res.data);
    })
    .then(err => {
      console.log("getAuthUser (Actions, Catch) :", res.data);
    });
}

/** çerezi localsotrage'a yaz */
export function setLocalStorageCookie() {
  const cookieName = "larautomation_session";
  let localStorageCookie = localStorage.setItem(
    cookieName,
    Cookies.get(cookieName)
  );
  console.log("setLocalStorageCookie: ", Cookies.get(cookieName));
}

/** çerezi localStorage'dan sil */
export function removeLocalStorageCookie() {
  localStorage.removeItem("larautomation_session");
  console.log("removeLocalStorageCookie : Çerez Localstorage'dan silindi");
}

/** Giriş yapan kullanıcıyı localstoage'a yaz */
export function setLocalStorageUser(context, user) {
  let localStorageUser = localStorage.getItem("user");
  if (localStorageUser) {
    console.log("setLocalStorageUser (if): ", localStorageUser);
  } else {
    localStorageUser = localStorage.setItem("user", JSON.stringify(user));
    console.log("setLocalStorageUser (else): ", localStorageUser);
  }
}

/** Giriş yapan Kullanıcı bilgisini localstorage'dan sil */
export function removeLocalStorageUser() {
  localStorage.removeItem("user");
  console.log("removeLocalStorageUser: Kullanıcı Localestorage'dan silindi");
}

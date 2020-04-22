import resource from "../../services/resource";
import { Notify } from "quasar";

/** İtemleri çek */
export async function getItemList(context, query) {
  context.dispatch("setIsLoading", true);
  return await resource
    .getItemList(query)
    .then(res => {
      context.commit("setItemList", { url: query.url, data: res.data });
      setTimeout(() => {
        context.dispatch("setIsLoading", false);
      }, 300);
      console.log("getItemList(Actions, Then): ", query.url, res.data);
    })
    .catch(err => {
      setTimeout(() => {
        context.dispatch("showNotify", {
          res: err,
          message: err.message
        });
        context.dispatch("setIsLoading", false);
      }, 5000);
      console.log("getItemList(Actions, Catch)", err);
    });
}

/** store item */
export async function storeItem(context, resourceData) {
  return await resource
    .storeItem(resourceData)
    .then(res => {
      context.dispatch("getItemList", resourceData);
      context.dispatch("showNotify", {
        res: res,
        message: "Başarılı şekide kaydedildi"
      });
      console.log("storeItem (Actions, Then) :", res);
    })
    .catch(err => {
      context.dispatch("showNotify", {
        res: err,
        message: "Kayıt sırasında sorun oluştu"
      });
      console.log("storeItem (Catch, Then) :", err);
    });
}

/** Update İtem */
export async function updateItem(context, resourceData) {
  return await resource
    .updateItem(resourceData)
    .then(res => {
      context.dispatch("getItemList", resourceData);
      context.dispatch("showNotify", {
        res: res,
        message: "Başarılı şekide güncellendi"
      });
      console.log("updateItem (Actions, Then)", res.data);
    })
    .catch(err => {
      context.dispatch("showNotify", {
        res: err,
        message: "Gncelleme sırasında sorun oluştu"
      });
      console.log("updateItem (Actions, Catch)", err);
    });
}

/** İtem Sil */
export async function deleteItem(context, query) {
  return await resource
    .deleteItem(query)
    .then(res => {
      context.dispatch("getItemList", { url: query.url });
      context.dispatch("showNotify", {
        res: res,
        message: "Başarılı şekide silindi"
      });
      console.log("deleteItem (Actions, Then): ", res.data);
    })
    .catch(err => {
      console.log("deleteItem (Actions, catch): ", err.response);
    });
}

/** Form alanlarını ayarla */
export async function setFormFormProps(context, query) {
  return await resource.fetchJson(query).then(res =>
    res.json().then(json => {
      console.log(json);
      context.commit("setItemList", { url: "formProps", data: json });
    })
  );
}

/** notification */
export function showNotify(context, data) {
  let type = "negative";
  if (
    data.res.status == 200 ||
    data.res.status == 201 ||
    data.res.status == 204
  ) {
    type = "positive";
  }
  Notify.create({
    type: type,
    timeout: 3000,
    position: "bottom",
    message: data.message
  });
}

/** set isLoading */
export function setIsLoading(context, isLoading) {
  context.commit("setIsLoading", isLoading);
}

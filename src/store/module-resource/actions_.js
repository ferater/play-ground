import resource from "../../services/resource";
import {
  Notify
} from "quasar";
/** İtemleri çek */
export async function getItemList(context, query) {
  context.dispatch("setIsLoading", true);
  return await resource
    .getItemList(query)
    .then(res => {
      context.commit("setItemList", {
        url: query.url,
        data: res.data
      });
      setTimeout(() => {
        context.dispatch("setIsLoading", false);
      }, 300)
      console.log("getItemList(Actions, Then): ", query.url, res.data);
    })
    .catch(err => {
      context.dispatch('getCatch', err)
    });
}

/** get item with relation  */
export async function getItemWithRelation(context, query) {
  return await resource.getItemWithRelation(query)
    .then(res => {
      if (res.data.length == 0) {
        context.dispatch("showNotify", {
          status: 900,
          data: {
            message: "Bu kategori boş"
          }
        });
      }
      context.commit("setItemList", {
        url: query.url + query.relation,
        data: res.data
      });
      console.log('getItemWithRelation (Actions, Then)', res.data);
    })
    .catch(err => {
      context.dispatch('getCatch', err)
    });
}

/** store item */
export async function storeItem(context, resourceData) {
  context.dispatch("setBtnLoading", true);
  return await resource
    .storeItem(resourceData)
    .then(res => {
      context.dispatch("setBtnLoading", false);
      context.dispatch("getItemList", resourceData);
      context.dispatch("showNotify", res);
      context.dispatch("setResourceForm", false);
      console.log("storeItem (Actions, Then) :", res);
    })
    .catch(err => {
      context.dispatch("setBtnLoading", false);
      context.dispatch("setFormErrors", Object.values(err.response.data));
      console.log("storeItem (Catch, Then) :", err.response);
    });
}

/** Update İtem */
export async function updateItem(context, resourceData) {
  context.dispatch("setBtnLoading", true);
  return await resource
    .updateItem(resourceData)
    .then(res => {
      context.dispatch("setBtnLoading", false);
      context.dispatch("getItemList", resourceData);
      context.dispatch("showNotify", res);
      context.dispatch("setResourceForm", false);
      console.log("updateItem (Actions, Then)", res.data);
    })
    .catch(err => {
      context.dispatch("setBtnLoading", false);
      context.dispatch("setFormErrors", Object.values(err.response.data));
      console.log("updateItem (Actions, Catch)", err);
    });
}

/** İtem Sil */
export async function deleteItem(context, query) {
  return await resource
    .deleteItem(query)
    .then(res => {
      context.dispatch("getItemList", {
        url: query.url
      });
      context.dispatch("showNotify", res);
      console.log("deleteItem (Actions, Then): ", res);
    })
    .catch(err => {
      context.dispatch("showNotify", err.response);
      console.log("deleteItem (Actions, catch): ", err.response);
    });
}

/** Form alanlarını ayarla */
export async function setFormFormProps(context, query) {
  return await resource.fetchJson(query).then(res =>
    res.json().then(json => {
      context.commit("setItemList", {
        url: "formProps",
        data: json
      });
      context.dispatch("setResourceForm", true);
      console.log(json);
    })
  );
}

/**
notification
*/
export function showNotify(context, res) {
  console.log('showNotify : ', res);
  let type = "negative";
  if (res.status) {
    let a = res.status.toString().charAt(0);
    if (a == 2) {
      type = "positive";
    } else if (a == 9) {
      type = "warning"
    }
  } else {
    type = "info"
  }
  Notify.create({
    type: type,
    timeout: 5000,
    position: "bottom",
    html: true,
    message: res.data.message
  });
}


export function getCatch(context, err) {
  if (!err.response) {
    setTimeout(() => {
      context.dispatch("showNotify", {
        status: 500,
        data: {
          message: "Bağlantı hatası, bağlantınızı kontrol edin..."
        }
      });
      context.dispatch("setIsLoading", false);
      console.log('getItemList(Actions, Catch: Network Error');
    }, 3000)
  } else {
    setTimeout(() => {
      context.dispatch("showNotify", err.response);
      context.dispatch("setIsLoading", false);
    }, 1000);
    console.log("getItemList(Actions, Catch)", err.response);
  }
}

/** set isLoading */
export function setIsLoading(context, isLoading) {
  context.commit("setIsLoading", isLoading);
}

/** set resourceForm */
export function setResourceForm(context, resourceForm) {
  context.commit("setResourceForm", resourceForm);
  context.dispatch("setFormErrors", []);
  console.log("setResourceForm (Actions)");
}

/** set btnLoading */
export function setBtnLoading(context, btnLoading) {
  context.commit("setBtnLoading", btnLoading);
}

/** set formErrors */
export function setFormErrors(context, formErrors) {
  context.commit("setFormErrors", formErrors);
}

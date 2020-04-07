import resource from "../../services/resource";

export async function getItemList(context, query) {
  try {
    const res = await resource.getItemList(query);
    context.commit("SET_ITEM_LIST", res.data);
    console.log("getList(store): ", res.data);
  } catch (err) {
    console.log("getList(store): ", err.response);
  }
}

export async function storeItem(context, query) {
  return await resource.storeItem(query).then((res) => {
    context.dispatch("getItemList", query);
    context.dispatch("setNotify", {res, type: "positive"})
    console.log("storeItem(then): ", res);
  });
}

export async function updateItem(context, query) {
  return await resource.updateItem(query).then((res) => {
    context.dispatch("getItemList", query);
    context.dispatch("setNotify", {res, type: "positive"})
    console.log('updateItem(Store)', res.data);
  });
}

export function deleteItem(context, query) {
  return resource
    .deleteItem(query)
    .then((res) => {
      context.commit("SET_SELECTED_ITEM", query);
      context.dispatch("getItemList", query);
      context.dispatch("setNotify", {res, type: "positive"})
      console.log("deleteItem(store): ", res.data);
    })
    .catch((err) => {
      console.log("deleteItem(catch):", err.response);
    });
}

export async function showResourceForm(context, jsonurl) {
  return await resource.fetchJson(jsonurl).then((res) => {
    res.json().then((json) => {
      context.commit("SET_FORM_FIELDS", json);
      context.dispatch("toggleResourceForm", true);
      console.log("showResourceForm(store)", json);
    });
  });
}

export async function toggleResourceForm(context, query) {
  context.commit("SET_RESOURCEDIALOG", query);
}

export function selectItem(context, query) {
  context.commit("SET_SELECTED_ITEM", query);
  console.log(query);
}

export function setNotify(context, data) {
  context.commit('SET_NOTIFY', data);
  console.log('setNotify çalıştı');
  
}

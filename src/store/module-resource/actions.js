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
  return await resource.storeItem(query)
    .then((res) => {
      context.dispatch("getItemList", query);
      console.log("storeItem(then): ", res);
    });
}

export function deleteItem(context, query) {
  return resource.deleteItem(query).then((res) => {
    context.commit("SET_SELECTED_ITEM", query);
    context.dispatch("getItemList", query);
    console.log("deleteItem(store): ", res.data);
  })
  .catch(err => {
    console.log('deleteItem(catch):', err.response);
    
  });
}

export async function showResourceForm(context, jsonurl) {
  return await resource.fetchJson(jsonurl).then((res) => {
    res.json().then((json) => {
      context.commit("SET_FORM_FIELDS", json);
      context.dispatch("hideResourceForm", true);
      console.log("showResourceForm(store)", json);
    });
  });
}

export async function hideResourceForm(context, query) {
  context.commit("SET_RESOURCEDIALOG", query);
}

export function selectItem(context, query) {
  context.commit("SET_SELECTED_ITEM", query);
  console.log(query);
}

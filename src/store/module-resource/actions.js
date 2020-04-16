import resource from "../../services/resource";

/** İtemleri çek */
export async function getItemList(context, query) {
  return await resource
    .getItemList(query)
    .then(res => {
      context.commit("setItemList", { url: query.url, data: res.data });
      console.log("getItemList(Actions, Then): ", query.url, res.data);
    })
    .catch(err => {
      console.log("getItemList(Actions, Catch)", err.response);
    });
}

/** İtem Formu Göster/Gizle */

/** İtem Sil */
export async function deleteItem(context, query) {
  return await resource
    .deleteItem(query)
    .then(res => {
      context.dispatch("getItemList", { url: query.url });
      console.log("deleteItem(Actions, Then): ", res.data);
    })
    .catch(err => {
      console.log("deleteItem(Actions, catch): ", err.response);
    });
}

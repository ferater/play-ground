import resource from "../../services/resource";

/*
export function someAction (context) {
}
*/

export async function getItemList(context, query) {
  try {
    const res = await resource.getItemList(query);
    context.commit('SET_ITEM_LIST', res.data);
    console.log('getList(store): ', res.data);
  } catch (error) {
    console.log('getList(store): ', error);
  }
}

export async function addItem(context, jsonurl) {
  
    return await resource.fetchJson(jsonurl)
      .then(res => {
          res.json()
         .then(json => {
           context.commit('SET_FORM_FIELDS', json);
           console.log('addItemAction(store)', json);
         })
      })

  // return resource.fetchJson(jsonurl)
  // .then(res => res.json()
  // .then(json => {
  //   context.commit('SET_FORM_FIELDS', json);
  //   // context.commit('SET_ADDITEM_DIALOG');
  //   console.log(json);
    
  // })
  // )
    
}

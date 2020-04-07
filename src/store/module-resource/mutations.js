/*
export function someMutation (state) {
}
*/

export function SET_ITEM_LIST(state, payload) {
  state.items = payload;
}


export function SET_SELECTED_ITEM(state, payload) {
  if (payload.selected) {
    state.selectedItem = payload.selectedItem;
  } else {
    state.selectedItem = {};
  }
}



/*** Formu Göster */
export function SET_FORM_FIELDS(state, payload) {
  state.fields = payload;
}

export function SET_RESOURCEDIALOG(state, payload) {
  state.resourceDialog = payload;
}

export function SET_NOTIFY(state, payload) {
  state.notifyMessage = payload.res.data;
  state.notifyType = payload.type;
}

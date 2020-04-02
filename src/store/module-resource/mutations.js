/*
export function someMutation (state) {
}
*/

export function SET_ITEM_LIST(state, payload) {
    state.items = payload;
}

export function SET_FORM_FIELDS(state, payload) {
    state.fields = payload;
}

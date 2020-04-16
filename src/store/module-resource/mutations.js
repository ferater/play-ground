export function setItemList(state, payload) {
  state[payload.url] = payload.data;
}

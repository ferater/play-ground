/** Set item list */
export function setItemList(state, payload) {
  state[payload.url] = payload.data;
}

/** set isLoading */
export function setIsLoading(state, isLoading) {
  state.isLoading = isLoading;
}


/* export function setFormProps(state, payload) {
  state.formProps = payload;
} */

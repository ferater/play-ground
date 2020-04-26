/** Set item list */
export function setItemList(state, payload) {
  state[payload.url] = payload.data;
}

/** set isLoading */
export function setIsLoading(state, isLoading) {
  state.isLoading = isLoading;
}

/** set resourceForm */
export function setResourceForm(state, resourceForm) {
  state.resourceForm = resourceForm;
}

/** set btnLoading */
export function setBtnLoading(state, btnLoading) {
  state.btnLoading = btnLoading;
}

/** set formErrors */
export function setFormErrors(state, formErrors) {
  state.formErrors = formErrors;
}




/* export function setFormProps(state, payload) {
  state.formProps = payload;
} */

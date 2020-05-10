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

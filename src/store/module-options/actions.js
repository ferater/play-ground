import options from "../../services/options";
/*
export function someAction (context) {
}
*/

export async function fetchOptions() {
  return await options.fetchOptions().then(res =>
    res.json().then(json => {
      console.log("fetchOptions: ", json);
      return json;
    })
  );
}

export function dynamicTableOptions(context) {
  context.dispatch("fetchOptions").then(res => {
    context.commit("SET_DYNAMICTABLE_PAGINATION", res.dynamicTable);
    console.log("dynamicTableOptions :", res);
  });
}

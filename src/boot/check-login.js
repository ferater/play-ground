// import something here

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
// export default async (/* { app, router, Vue ... } */) => {
//   // something to do
// }

export default ({ router, store, Vue }) => {
  router.beforeEach((to, from, next) => {
    store.dispatch('auth/checkIsLoggedIn');
    let isLoggedIn = store.state.auth.isLoggedIn;
    if (to.name !== 'login' && !isLoggedIn) next({ name: 'login' })
    else if (to.name == 'login' && isLoggedIn) {
      next({ name: 'dashboard' })
    }
  else next()
    // Now you need to add your authentication logic here, like calling an API endpoint
  })
}

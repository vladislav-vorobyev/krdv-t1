export default function ({ app, redirect }) {
  // If the user is not authenticated
  if (!app.$cookies.get('isAuthenticated')) {
    // console.log(app.$cookies.getAll())
    return redirect('/login')
  }
}

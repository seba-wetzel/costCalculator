import {firebaseAuth} from 'boot/firebase'

export default ({router}) => {
  router.beforeEach((to, from, next) => {
    firebaseAuth.onAuthStateChanged(user => {
      if( !user && to.path !== '/auth'){
        next('/auth')
      }else{
        next()
      }    
    })
  })
}
import {firebaseAuth, provider} from 'boot/firebase'

const state = {
  loggedIn: false,
  error: null, 
  loading: false,
  userData: null,
}
const mutations = {
  setLoggedIn(state, value){
    state.loggedIn = value
  },
  setError(state, value){
    state.error = value
  },
  setLoading(state, value){
    state.loading = value
  },
  setUserdata(state, value){
    state.userData = value
  }
}
const actions = {
  
  loginUserWithGoogle({commit}, payload){
    commit("setLoading", true);
    firebaseAuth.signInWithRedirect(
      provider
    )
    .then(response => {
      commit("setLoading", false);
      console.log('response', response);
    })
    .catch(e => {
      commit("setLoading", false);
      commit('setError', e)
      console.log(e);
    })
  },
  loginUserWithEmail({commit}, payload){
    commit("setLoading", true);
    firebaseAuth.signInWithEmailAndPassword(
      payload.email, payload.password
    )
    .then(response => {
      commit("setLoading", false);
      console.log('response', response);
    })
    .catch(e => {
      commit("setLoading", false);
      commit('setError', e)
      console.log(e);
    })
  },
  logoutUser(){
    firebaseAuth.signOut()
  },
  handleAuthStateChange({commit, dispatch}){
    firebaseAuth.onAuthStateChanged(user => {
      if(user){
        commit('setLoggedIn', true)
        localStorage.setItem('loggedIn', true)
        commit('setUserdata', user);
      }else{
        commit('setLoggedIn', false);
        localStorage.getItem('loggedIn', false)
        commit('setUserdata', null);
      }
    })
  }
}
const getters = {

}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
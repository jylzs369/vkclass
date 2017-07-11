import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    axios: false,
    user: null
  },
  actions: {
    state ({commit}, data) {
      commit('state', data)
    }
  },
  mutations: {
    state (state, data) {
      state.user = data
    }
  }
})

// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import partComponent from './views/part_component/vuex_module.js'
Vue.use(Vuex)
const state = {}
const actions = {}
const mutations = {}
const getters = {}
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
  modules: {
    partComponent
  }
})

import Vue from 'vue'
import Vuex from 'vuex'
import trainer from './trainer'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    trainer: trainer
  }
})

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    learned: [],
    failed: [],
    phraseQueue: []
  },
  mutations: {
    incrementLearned(state, item) {
      state.learned.push(item);
      state.failed = state.failed.filter(phrase => phrase.id !== item.id);
    },
    incrementFailed(state, item) {
      state.phraseQueue.push(item);
      if(!state.failed.some(phrase => phrase.id === item.id)) state.failed.push(item);
    },
    initQueue(state, items) {
      state.phraseQueue.push(...items);
    }
  },
  getters: {

    getPhrase: state => () => {
      return state.phraseQueue.shift();
    }

  }
})

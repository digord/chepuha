export default {
  state: {
    learned: [],
    failed: [],
    phraseQueue: [],
    passedPhrasesNum: 0,
    length: 0,
    name: '',
    phrase: {}
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
    initQueue(state, collection) {
      state.phraseQueue.push(...collection.list);
      state.length = collection.list.length;
      state.name = collection.name;
    },
    unload(state) {
      state.learned = [];
      state.failed = [];
      state.phraseQueue = [];
      state.passedPhrasesNum = 0;
      state.length = 0;
      state.name = '';
      state.phrase = {};

    },
    getPhrase(state) {
      state.passedPhrasesNum++;
      state.phrase = state.phraseQueue.shift();
    },

  },
  getters: {

    successPercentage: state => () => {
      return state.learned.length / (state.length * 0.01);
    },

    failedPercentage: state => () => {
      return state.failed.length / (state.length * 0.01);
    },

  }
}
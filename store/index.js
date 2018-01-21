export const state = () => ({
    counter: 0,
    dogs: null,
    labels: null,
    stories: null,
    lang: 'en'
  })
  
  export const mutations = {
    increment (state) {
      state.counter++
    },
    dogs (state,data) {
      state.dogs = data
    },
    labels (state,data) {
      state.labels = data
    },
    stories (state,data) {
      state.stories = data
    },
    updateLang(state, lang) {
      state.lang = lang
    }
  }

  export const actions = {
    nuxtServerInit ({ commit }, { req }) {
      console.log(req.serverdata)
      if (req.serverdata.labels) {
        commit('labels', req.serverdata.labels)
      }
      if (req.serverdata.stories) {
        commit('stories', req.serverdata.stories)
      }
      if (req.serverdata.dogs) {
        commit('dogs', req.serverdata.dogs)
      }
    }
  }
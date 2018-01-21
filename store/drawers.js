export const state = () => ({
    list: [],
    shownav: false
  })
  
  export const mutations = {
    
    togglenav (state) {
      state.shownav = !state.shownav
    }
  }

  export const getters = {
      shownav (state) {
          return state.shownav
      }
  }
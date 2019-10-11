import { VuexModule } from 'vuex-typed-modules'

// const state = {
//   count: 1,
//   zot: 'banaan'
// }
const mutations = {
  addCount (state, number) {
    state.count += number
  }
}

export const testModule = new VuexModule({
  name: 'testModule',
  state: {
    count: 1,
    zot: 'banaan'
  },
  mutations
})

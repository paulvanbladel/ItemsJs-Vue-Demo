import Vue from 'vue'
import Vuex from 'vuex'

import { Database } from 'vuex-typed-modules'
import { testModule } from './test.module.js'

Vue.use(Vuex)
const database = new Database({ logger: true })
export default new Vuex.Store({
  plugins: [database.deploy([testModule])]
})

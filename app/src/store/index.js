import Vue from 'vue'
import Vuex from 'vuex'

import { Database } from 'vuex-typed-modules'
import { testModule } from './test.module'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
const database = new Database({ logger: true })
export default new Vuex.Store({
  plugins: [database.deploy([testModule])],

  // enable strict mode (adds overhead!)
  // for dev mode only
  strict: process.env.DEV
})

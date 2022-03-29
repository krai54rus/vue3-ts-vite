import { createStore, createLogger } from 'vuex'
import module from './modules/module'

export interface IRootState {
  pageConfig: any
  profile: any
}

export default createStore({
  // state,
  // getters,
  // actions,
  // mutations,
  modules: {
    module: module(),
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})

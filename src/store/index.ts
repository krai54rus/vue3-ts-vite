import { createStore, createLogger } from 'vuex'
import module from './modules/module'

export default createStore({
  // state,
  // getters,
  // actions,
  // mutations,
  modules: {
    module,
  },
  plugins: process.env.NODE_ENV !== 'production' ? [createLogger()] : [],
})

import { Module } from 'vuex'
import { IRootState } from '@/store'
import api, { errorHandler } from '@/api'

interface IModuleState {
  items: Array<IModuleItem>
  loading: boolean
}

interface IModuleItem {
  userId: number
  id: number
  title: string
  completed: boolean
}

export default (): Module<IModuleState, IRootState> => ({
  namespaced: true,

  state: {
    items: [],
    loading: false,
  },

  getters: {
    getAll(state): Array<IModuleItem> {
      return state.items
    },
  },

  mutations: {
    setItems(state, payload) {
      state.items = payload
    },
    setLoading(state, payload: boolean) {
      state.loading = payload
    },
  },

  actions: {
    async loaditems({ commit }) {
      try {
        commit('setLoading', true)

        const result = await api(
          'https://jsonplaceholder.typicode.com/users',
          'GET'
        )

        console.log(result)

        commit('setItems', result)
      } catch (e: any) {
        errorHandler(e)
      } finally {
        commit('setLoading', false)
      }
    },
  },
})

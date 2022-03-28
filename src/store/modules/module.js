// initial state
const state = {
  all: [],
}

// getters
const getters = {
  getAll({ context }) {
    return this.context.all
  },
}

// actions
const actions = {
  getItems({ commit, items }) {
    commit('setProducts', items)
  },
}

// mutations
const mutations = {
  setProducts(state, products) {
    state.all = products
  },

  decrementProductInventory(state, { id }) {
    const product = state.all.find(product => product.id === id)
    product.inventory--
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

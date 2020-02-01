import { getAccessorType, mutationTree, actionTree } from 'nuxt-typed-vuex'

import * as products from './products'
import * as cart from './cart'

export const state = () => ({})

type RootState = ReturnType<typeof state>

export const getters = {}

export const mutations = mutationTree(state, {})

export const actions = actionTree({ state, getters, mutations }, {})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions,
  modules: {
    products,
    cart
  }
})

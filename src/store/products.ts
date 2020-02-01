import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

interface State {}

export const state = (): State => ({})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {})

export const actions = actionTree({ state, getters, mutations }, {})

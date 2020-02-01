import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

interface Product {
  id: number
  thumbnail: string
  title: string
  price: number
}

interface State {
  productsData: Array<Product> | null
}

export const state = (): State => ({
  productsData: null
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  setProducts(state, productsData: State['productsData']) {
    state.productsData = productsData
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getProducts({ commit }) {
      const productsData = await fetch(
        'http://www.mocky.io/v2/5e3588c72f00007c00793483'
			).then(r => r.json())
			
			commit('setProducts', productsData);
    }
  }
)

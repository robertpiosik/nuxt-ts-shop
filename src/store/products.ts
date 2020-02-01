import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

interface Product {
  id: number
  thumbnail: string
  title: string
  price: number
}

interface State {
  products: Array<Product> | null
}

export const state = (): State => ({
  products: null
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  setProducts(state, productsData: State['products']) {
    state.products = productsData
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getProducts({ commit }) {
      const productsData: Array<Product> = await fetch(
        'http://www.mocky.io/v2/5e3588c72f00007c00793483'
			).then(r => r.json())
			
			commit('setProducts', productsData);
    }
  }
)

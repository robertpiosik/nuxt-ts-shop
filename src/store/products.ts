import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

interface Product {
  id: number
  title: string
  price: number
  thumbnail: string
}

interface State {
  productsData: Product[]
}

export const test = 's'

export const state = (): State => ({
  productsData: []
})

export const getters = getterTree(state, {
  getProductsAmount: state => state.productsData.length
})

export const mutations = mutationTree(state, {
  setProductsData(state, productsData: Product[]) {
    state.productsData = productsData
  },
  sortProductsDataByPriceAsc(state) {
    state.productsData = state.productsData.sort(
      (firstProd, secondProd) => firstProd.price - secondProd.price
    )
  },
  sortProductsDataByPriceDesc(state) {
    state.productsData = state.productsData.sort(
      (firstProd, secondProd) => secondProd.price - firstProd.price
    )
  },
  sortProductsDataByNameAZ(state) {
    state.productsData = state.productsData.sort((firstProd, secondProd) => {
      const firstProdTitle = firstProd.title.toUpperCase()
      const secondProdTitle = secondProd.title.toUpperCase()

      if (firstProdTitle < secondProdTitle) return -1
      if (firstProdTitle > secondProdTitle) return 1
      return 0
    })
  },
  sortProductsDataByNameZA(state) {
    state.productsData = state.productsData.sort((firstProd, secondProd) => {
      const firstProdTitle = firstProd.title.toUpperCase()
      const secondProdTitle = secondProd.title.toUpperCase()

      if (firstProdTitle > secondProdTitle) return -1
      if (firstProdTitle < secondProdTitle) return 1
      return 0
    })
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async getProductsData({ commit }) {
      const productsData = await fetch(
        'https://www.mocky.io/v2/5e3588c72f00007c00793483?mocky-delay=850ms'
      ).then(r => r.json())

      commit('setProductsData', productsData)
    }
  }
)

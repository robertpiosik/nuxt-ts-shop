import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

interface CartItem {
  productId: number
  quantity: number
}

interface State {
  cartItems: CartItem[]
}

export const state = (): State => ({
  cartItems: []
})

export const getters = getterTree(state, {})

export const mutations = mutationTree(state, {
  addToCart(state, productId: number) {
    const indexOfCurrentlyAddedProduct = state.cartItems.findIndex(
      i => i.productId === productId
    )

    if (indexOfCurrentlyAddedProduct !== -1) {
      state.cartItems[indexOfCurrentlyAddedProduct].quantity += 1
    } else {
      state.cartItems.push({ productId, quantity: 1 })
    }
  }
})

export const actions = actionTree({ state, getters, mutations }, {})

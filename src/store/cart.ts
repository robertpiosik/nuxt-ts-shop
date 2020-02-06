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
  setCartItems(state, cartItems: CartItem[]) {
    state.cartItems = cartItems
  },
  addToCart(state, productId: number) {
    const indexOfCurrentlyAddedProduct = state.cartItems.findIndex(
      i => i.productId === productId
    )
    if (indexOfCurrentlyAddedProduct !== -1) {
      state.cartItems[indexOfCurrentlyAddedProduct].quantity += 1
    } else {
      state.cartItems.push({ productId, quantity: 1 })
    }
  },
  increaseQuantity(state, productId: number) {
    const indexOfItem = state.cartItems.findIndex(
      i => i.productId === productId
    )
    if (indexOfItem !== -1) {
      state.cartItems[indexOfItem].quantity += 1
    }
  },
  decreaseQuantity(state, productId: number) {
    const indexOfItem = state.cartItems.findIndex(
      i => i.productId === productId
    )
    if (indexOfItem !== -1 && state.cartItems[indexOfItem].quantity >= 2) {
      state.cartItems[indexOfItem].quantity -= 1
    } else {
      state.cartItems.splice(indexOfItem, 1)
    }
  },
  removeItem(state, productId: number) {
    const indexOfItem = state.cartItems.findIndex(
      i => i.productId === productId
    )
    if (indexOfItem !== -1) {
      state.cartItems.splice(indexOfItem, 1)
    }
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    preserveCartState({ state }) {
      localStorage.setItem('cartState', JSON.stringify(state.cartItems))
    },
    loadCartState({ commit }) {
      const stateString = localStorage.getItem('cartState')
      if (stateString) {
        commit('setCartItems', JSON.parse(stateString))
      }
    }
  }
)

import { defineStore } from 'pinia'

export const cartStore = defineStore('cart', {
  state: () => ({
    /** @type {{ title: string, id: number, category: string, image: string, description: string, price: number, quantity: number }[]} */
    items: [],
    nextId: 0,
  }),
  getters: {
    /**
     * @returns {number}
     */
    total(state) {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },
  },
  actions: {
    /**
     * @param {object} item
     */
    pushItem(item) {
      this.items.push({
        title: item.title,
        id: this.nextId++,
        category: item.category,
        image: item.image,
        description: item.description,
        price: item.price,
        quantity: item.quantity
      })
    },
    /**
     * @param {string} title
     */
    itemAlreadyExists(title) {
      return this.items.find(item => item.title === title)
    },
    /**
     * @param {number} id
     * @param {number} quantity
     */
    updateItemQuantity(id, quantity) {
      const item = this.items.find((item) => item.id === id)
      if (item) {
        item.quantity = quantity
      }
    },
    /**
     * @param {number} id
     */
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
})

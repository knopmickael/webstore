<template>
  <div class="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
    <div id="cart-store-bg" class="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity"></div>
    <div id="cart-store-modal" class="fixed inset-0 overflow-hidden transition-all translate-x-full">
      <div id="triggerable-modal-closer" class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col overflow-hidden bg-white shadow-xl pr-3">

              <div class="flex items-start justify-between py-6 px-4 sm:px-8">
                <h2 class="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                <div class="ml-3 flex h-7 items-center">
                  <button @click="closeCart" type="button" class="-m-2 p-2 text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Close panel</span>
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <div class="flex-1 overflow-y-auto px-4 sm:px-8">
                <div class="mt-8">
                  <div class="flow-root">
                    <ul v-if="products.length" role="list" class="-my-6 divide-y divide-gray-200">
                      <li v-for="product, index in products" :key="index" class="flex py-6">
                        <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img :src="product.image" :alt="product.description"
                            class="h-full w-full object-cover object-center">
                        </div>
                        <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3 class="font-bold text-sm">{{ product.title }}</h3>
                              <p class="ml-4">${{ product.price }}</p>
                            </div>
                            <p class="mt-1 text-xs text-gray-500">{{ product.category.split(' ').map(word => word.replace(/^\w/, c => c.toUpperCase())).join(' ') }}</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <input type="number" v-model="product.quantity" min="1" class="px-2 w-20 rounded h-8 shadow-lg" />

                            <div class="flex">
                              <button @click="rmvItem(product.id)" type="button"
                                class="font-medium text-indigo-600 hover:text-indigo-500">
                                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                  xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"
                                  class="fill-gray-300 hover:fill-gray-500" viewBox="0 0 490.646 490.646"
                                  xml:space="preserve">
                                  <g>
                                    <g>
                                      <path d="M399.179,67.285l-74.794,0.033L324.356,0L166.214,0.066l0.029,67.318l-74.802,0.033l0.025,62.914h307.739L399.179,67.285z
			 M198.28,32.11l94.03-0.041l0.017,35.262l-94.03,0.041L198.28,32.11z" />
                                      <path d="M91.465,490.646h307.739V146.359H91.465V490.646z M317.461,193.372h16.028v250.259h-16.028V193.372L317.461,193.372z
			 M237.321,193.372h16.028v250.259h-16.028V193.372L237.321,193.372z M157.18,193.372h16.028v250.259H157.18V193.372z" />
                                    </g>
                                  </g>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    </ul>
                    <div v-else>Your cart is empty...</div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 py-6 px-4 sm:px-8">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{{ total > 0 ? '$' + total : '-' }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6">
                  <button :disabled="total == 0"
                    class="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full disabled:opacity-50 disabled:cursor-not-allowed">Checkout</button>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or
                    <button type="button" class="font-medium text-indigo-600 hover:text-indigo-500">
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '@/stores/cart'
import { onMounted, ref } from 'vue';

export default {
  emits: ['closeCartModal'],
  setup(props, { emit }) {
    const cart = cartStore();
    const products = ref([]);
    const total = ref(0);

    const toggleCartAnimation = turn => {
      let cartBg = document.getElementById('cart-store-bg');
      let cartModal = document.getElementById('cart-store-modal');

      if (turn === 'open') {
        cartBg.classList.remove('bg-opacity-0');
        cartBg.classList.add('bg-opacity-70');
        setTimeout(() => {
          cartModal.classList.remove('translate-x-full');
        }, 250);
      } else {
        cartModal.classList.add('translate-x-full');
        setTimeout(() => {
          cartBg.classList.remove('bg-opacity-70');
          cartBg.classList.add('bg-opacity-0');
          setTimeout(() => {
            emit('closeCartModal');
          }, 250);
        }, 250);
      }
    };

    const closeCart = () => toggleCartAnimation('close');

    const listenBgClick = () => {
      const handleClick = e => {
        if ('triggerable-modal-closer' === e.target.id) {
          closeCart();
          document.removeEventListener("click", handleClick);
        }
      };
      document.addEventListener("click", handleClick);
    };

    onMounted(() => {
      toggleCartAnimation('open');
      products.value = cart.items;
      total.value = cart.total;
      listenBgClick();
    });

    cart.$subscribe((mutation, state) => {
      products.value = state.items
      total.value = cart.total;
    });

    const rmvItem = id => cart.removeItem(id);

    return {
      products,
      total,
      closeCart,
      rmvItem
    }
  }
}
</script>
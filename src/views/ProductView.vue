<template>
  <div class="container mx-auto flex items-center flex-wrap pt-12 p-6">
    <div v-if="pending">
      <p>Carregando produto...</p>
    </div>
    <div v-else class="flex flex-col md:flex-row space-y-16 md:space-y-0 md:space-x-4 lg:py-20 lg:items-center">
      <div class="md:w-1/2">
        <img :src="product.image" :alt="product.title" class="md:max-h-96 mx-auto w-3/4 md:w-auto">
      </div>
      <div class="space-y-6 md:w-1/2">
        <h2 class="text-3xl font-bold text-center md:text-left">{{ product.title }}</h2>
        <p class="px-4 text-justify md:px-0">{{ product.description }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <input type="number" v-model="quantity" min="1" class="px-2 w-20 rounded h-8 shadow-lg" />
            <button @click="addToCart" class="bg-gray-600 transition-all hover:bg-gray-500 p-1 pl-2 rounded shadow-lg">
              <svg fill="#FFF" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" width="24" height="24" viewBox="0 0 902.86 902.86"
                xml:space="preserve">
                <g>
                  <g>
                    <path d="M671.504,577.829l110.485-432.609H902.86v-68H729.174L703.128,179.2L0,178.697l74.753,399.129h596.751V577.829z
			 M685.766,247.188l-67.077,262.64H131.199L81.928,246.756L685.766,247.188z" />
                    <path d="M578.418,825.641c59.961,0,108.743-48.783,108.743-108.744s-48.782-108.742-108.743-108.742H168.717
			c-59.961,0-108.744,48.781-108.744,108.742s48.782,108.744,108.744,108.744c59.962,0,108.743-48.783,108.743-108.744
			c0-14.4-2.821-28.152-7.927-40.742h208.069c-5.107,12.59-7.928,26.342-7.928,40.742
			C469.675,776.858,518.457,825.641,578.418,825.641z M209.46,716.897c0,22.467-18.277,40.744-40.743,40.744
			c-22.466,0-40.744-18.277-40.744-40.744c0-22.465,18.277-40.742,40.744-40.742C191.183,676.155,209.46,694.432,209.46,716.897z
			 M619.162,716.897c0,22.467-18.277,40.744-40.743,40.744s-40.743-18.277-40.743-40.744c0-22.465,18.277-40.742,40.743-40.742
			S619.162,694.432,619.162,716.897z" />
                  </g>
                </g>
              </svg>
            </button>
          </div>
          <p class="text-2xl font-bold text-right">${{ product.price }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cartStore } from '@/stores/cart'
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const product = ref({});
    const pending = ref(true);
    const quantity = ref(1);
    const cart = cartStore();

    const fetchProduct = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/' + route.params.id);
        const data = await res.json();
        product.value = data;
        pending.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    const addToCart = () => {
      try {
        cart.pushItem({
          title: product.value.title,
          category: product.value.category,
          image: product.value.image,
          description: product.value.description,
          price: product.value.price,
          quantity: quantity.value
        });
      } catch (error) {
        console.log('Error: ' + error);
      }
    };   

    onMounted(() => {
      fetchProduct();
    });

    return {
      product,
      pending,
      quantity,
      addToCart
    };
  }
};
</script>
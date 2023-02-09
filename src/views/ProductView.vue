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
        <p class="text-2xl font-bold text-right">$ {{ product.price }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const route = useRoute();
    const product = ref({});
    const pending = ref(true);

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

    onMounted(() => {
      fetchProduct();
    });

    return {
      product,
      pending
    };
  }
};
</script>
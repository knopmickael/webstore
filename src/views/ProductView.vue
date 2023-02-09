<template>
  <div>
    <div v-if="pending">
      <p>Aguardando produto do servidor...</p>
    </div>
    <div v-else>
      <p>{{ product.title }}</p>
      <p>{{ product.description }}</p>
      <p>{{ product.price }}</p>
    </div>

  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const route = useRoute()
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
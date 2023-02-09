<template>
  <section id="store-section" class="bg-white py-8">

    <div class="container mx-auto flex items-center flex-wrap pt-4 pb-12">

      <nav id="store" class="w-full z-30 top-0 px-6 py-1">
        <div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">

          <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
            Store
          </a>

          <div class="flex items-center" id="store-nav-content">

            <a class="pl-3 inline-block no-underline hover:text-black" href="#">
              <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24">
                <path d="M7 11H17V13H7zM4 7H20V9H4zM10 15H14V17H10z" />
              </svg>
            </a>

            <a class="pl-3 inline-block no-underline hover:text-black" href="#">
              <svg class="fill-current hover:text-black" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24">
                <path
                  d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </a>

          </div>
        </div>
      </nav>

      <div v-if="pending">
        <p>Aguardando produtos do servidor...</p>
      </div>
      <div v-else class="container mx-auto flex items-center flex-wrap">
        <div v-for="product in products" :key="product.id" class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col text-center">
          <RouterLink :to="`/products/${product.id}`" class="space-y-4">
            <img class="hover:grow hover:opacity-70 max-h-56 mx-auto"
              :src="product.image">
            <div class="pt-3 flex items-center justify-between">
              <p class="font-bold mx-auto">{{ product.title }}</p>
            </div>
            <p class="pt-1 text-gray-900">$ {{ product.price }}</p>
          </RouterLink>
        </div>
      </div>

    </div>

  </section>
</template>

<script>
import { RouterLink } from 'vue-router'
import { ref, onMounted, reactive } from 'vue';

export default {
  setup() {
    const screenWidth = ref(0);
    const products = reactive([]);
    const pending = ref(true);

    const checkWindowWidth = () => {
      screenWidth.value = window.innerWidth;
      window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
      });
    };

    const fetchProducts = async () => {
      try {
        let limit = screenWidth.value <= 768 ? '4' : screenWidth.value >= 1280 ? '8' : '6';
        const res = await fetch('https://fakestoreapi.com/products?limit=' + limit);
        const data = await res.json();
        products.splice(0, products.length, ...data);
        pending.value = false;
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      checkWindowWidth();
      fetchProducts();
    });

    return {
      products,
      pending
    };
  }
};
</script>
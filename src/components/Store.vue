<template>
  <section class="container mx-auto flex items-center flex-wrap pt-14">

    <nav id="store" class="w-full z-30 top-0 px-6 py-1">
      <div class="w-full container mx-auto flex flex-col md:flex-row flex-wrap items-center justify-between mt-0 px-2 py-3 space-y-6 md:space-y-0">

        <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl " href="#">
          Store
        </a>

        <div v-if="loadingCategories">
          <p>Carregando categorias...</p>
        </div>
        <div v-else class="flex divide-x divide-black divide-solid text-sm xl:text-md">
          <div v-for="category, index in categories" :key="index">
            <button @click="filterProductsByCategory(category)" class="h-full flex items-center">
              <p class="px-2 lg:px-4 hover:underline" :class="activeCategory == category ? 'font-bold' : ''">{{ category.split(' ').map(word => word.replace(/^\w/, c => c.toUpperCase())).join(' ') }}</p>
            </button>
          </div>
        </div>

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

    <div v-if="loadingProducts" class="text-center mt-12 w-full">
      <p>Carregando produtos...</p>
    </div>
    <div v-else class="container mx-auto flex items-center flex-wrap lg:mt-12">
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

  </section>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, reactive } from 'vue';

export default {
  setup(props) {
    const screenWidth = ref(0);
    const loadingCategories = ref(true);
    const categories = reactive([]);
    const loadingProducts = ref(true);
    const products = reactive([]);
    const activeCategory = ref(props.category);
    const router = ref(useRouter());

    const checkWindowWidth = () => {
      screenWidth.value = window.innerWidth;
      window.addEventListener('resize', () => {
        screenWidth.value = window.innerWidth;
      });
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        // let capitalizedStrings = data.map(string => string.split(' ').map(word => word.replace(/^\w/, c => c.toUpperCase())).join(' '));
        categories.splice(0, categories.length, ...data);
        loadingCategories.value = false;
        
      } catch (error) {
        console.error(error);
      }
    };

    const fetchProducts = async () => {
      try {
        const category = activeCategory.value;
        let categoryFilter = category != '' ? '/category/' + category : '';

        let limit = '';
        if (category == '') { // change this condition to use it in more robust context, like product pagination
          limit = '?limit=';
          limit += screenWidth.value <= 768 ? '4' : screenWidth.value >= 1280 ? '8' : '6';
        }

        let url = 'https://fakestoreapi.com/products' + categoryFilter + limit;
        const res = await fetch(url);
        const data = await res.json();
        products.splice(0, products.length, ...data);
        loadingProducts.value = false;
        
      } catch (error) {
        console.error(error);
      }
    };

    const filterProductsByCategory = async (category) => {
      loadingProducts.value = true;
      let routeHandler = router.value
      if (routeHandler.currentRoute.name != 'categories')
        routeHandler.push({ path: `/categories/${category}` });
      else {loadingProducts
        activeCategory.value = category;
        fetchProducts();
      }
    };

    onMounted(() => {
      checkWindowWidth();
      fetchCategories();
      fetchProducts();
    });

    return {
      categories,
      loadingCategories,
      products,
      loadingProducts,
      activeCategory,
      filterProductsByCategory
    };
  },
  props: {
    category: {
      type: String,
      default: ''
    }
  }
};
</script>
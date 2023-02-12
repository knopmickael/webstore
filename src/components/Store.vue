<template>
  <section class="container mx-auto pt-14">

    <nav id="store" class="w-full z-30 top-0 px-6 py-1">
      <div class="w-full container mx-auto flex flex-col lg:flex-row items-center justify-between mt-0 px-2 py-3 space-y-6 lg:space-y-0">

        <a class="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl" href="#">
          Store
        </a>

        <div v-if="loadingCategories">
          <p>Carregando categorias...</p>
        </div>
        <div v-else class="flex divide-x divide-black divide-solid text-xs xl:text-md">
          <div v-for="category, index in categories" :key="index">
            <button @click="filterProductsByCategory(category)" class="h-full flex items-center">
              <p class="px-2 lg:px-4 hover:underline" :class="activeCategory == category ? 'font-bold' : ''">{{
                category.split(' ').map(word => word.replace(/^\w/, c => c.toUpperCase())).join(' ')
              }}</p>
            </button>
          </div>
        </div>

        <div class="flex items-center justify-center space-x-4">
          <div class="flex items-center space-x-2">
            <button id="search-product-btn" @click="handleShowSearchBar" class="inline-block no-underline hover:text-black">
              <svg class="fill-black opacity-30 transition-all hover:opacity-100" :class="!showSearchBar ? '' : 'opacity-100'" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24">
                <path
                  d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
              </svg>
            </button>
            <input id="search-product-bar" v-model="searchProduct" type="search" class="outline-none transition-all" :class="showSearchBar ? 'border-b-2 border-gray-600 px-1 w-40 md:w-56' : 'w-0'">
          </div>

          <select  v-if="!loadingProducts" v-model="orderBy" class="text-xs cursor-pointer p-2 rounded-lg shadow-md transition-all hover:shadow-lg hover:bg-gray-100 outline-none">
            <option value="">Order products...</option>
            <option v-for="option, index in orderByOptions" :value="option.value" :key="index">
              {{ option.label }}
            </option>
          </select>
          
          <div  v-if="!loadingProducts" class="flex space-x-2">
            <svg @click="orderAsc = (orderBy != '') ? true : orderAsc" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" class="bi bi-chevron-double-down cursor-pointer transition-all hover:scale-125" viewBox="0 0 16 16" :class="!orderAsc || orderBy == '' ? 'opacity-30' : ''">
              <path fill-rule="evenodd" d="M1.646 6.646a.5.5 0 0 1 .708 0L8 12.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
              <path fill-rule="evenodd" d="M1.646 2.646a.5.5 0 0 1 .708 0L8 8.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
            </svg>
            <svg @click="orderAsc = (orderBy != '') ? false : orderAsc" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000" class="bi bi-chevron-double-down cursor-pointer transition-all hover:scale-125" viewBox="0 0 16 16" :class="orderAsc || orderBy == '' ? 'opacity-30' : ''">
              <path fill-rule="evenodd" d="M7.646 2.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 3.707 2.354 9.354a.5.5 0 1 1-.708-.708l6-6z"/>
              <path fill-rule="evenodd" d="M7.646 6.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 7.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
            </svg>
          </div>
        </div>
      </div>
    </nav>

    <div v-if="loadingProducts" class="text-center mt-12 w-full">
      <p>Carregando produtos...</p>
    </div>
    <div v-else class="container mx-auto flex items-baseline flex-wrap md:mt-4 lg:mt-8">
      <div v-for="product in filteredProducts" :key="product.id"
        class="w-full md:w-1/3 xl:w-1/4 p-6 flex flex-col text-center text-xs">
        <RouterLink :to="`/products/${product.id}`" class="space-y-1">
          <img class="hover:grow hover:opacity-70 max-h-56 mx-auto" :src="product.image">
          <div class="pt-3 flex items-center justify-between">
            <p class="font-bold mx-auto">{{ product.title }}</p>
          </div>
          <p class="text-gray-500">$ {{ product.price }} | &#9733; {{ product.rating.rate }}</p>
        </RouterLink>
      </div>
    </div>

  </section>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router'
import { ref, onMounted, reactive, watch, computed } from 'vue';

export default {
  setup(props) {
    const screenWidth = ref(0);
    const router = ref(useRouter());

    const loadingCategories = ref(true);
    const categories = reactive([]);
    const activeCategory = ref(props.category);

    const loadingProducts = ref(true);
    const products = reactive([]);
    
    const orderAsc = ref(true);
    const orderBy = ref("");
    const orderByOptions = ref([
      { value: 'title', label: "Title" },
      { value: 'price', label: "Price" },
      { value: 'rate', label: "Rate" }
    ]);

    const showSearchBar = ref(false);
    const searchProduct = ref("");

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
        console.log('Error: ' + error);
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
        console.log('Error: ' + error);
      }
    };

    const filterProductsByCategory = async category => {
      loadingProducts.value = true;
      let routeHandler = router.value
      if (routeHandler.currentRoute.name != 'categories')
        routeHandler.push({ path: `/categories/${category}` });
      else {
        loadingProducts
        activeCategory.value = category;
        fetchProducts();
      }
    };

    const sortProducts = () => {
      products.sort((p1, p2) => {
        switch (orderBy.value) {
          case 'title':
            if (orderAsc.value == true)
              return p1.title > p2.title ? 1 : -1;
            else
              return p1.title > p2.title ? -1 : 1;
            break;
          case 'price':
            if (orderAsc.value == true)
              return p1.price > p2.price ? 1 : -1;
            else
              return p1.price > p2.price ? -1 : 1;
            break;
          case 'rate':
            if (orderAsc.value == true)
              return p1.rating.rate > p2.rating.rate ? 1 : -1;
            else
              return p1.rating.rate > p2.rating.rate ? -1 : 1;
            break;
        }
      });
    };

    const handleShowSearchBar = () => {
      showSearchBar.value = !showSearchBar.value;
      document.getElementById('search-product-bar').focus();
    };

    const filteredProducts = computed(() => {
      return products.filter(product => product.title.toLowerCase().includes(searchProduct.value.toLowerCase()));
    });

    watch(orderBy, () => sortProducts());
    watch(orderAsc, () => sortProducts());

    watch(showSearchBar, value => {
      if (value == true) {
        setTimeout(() => {
          const handleClick = e => {
            if (!['search-product-bar', 'search-product-btn'].includes(e.target.id) && searchProduct.value.length === 0) {
              searchProduct.value = "";
              showSearchBar.value = false;
              document.removeEventListener("click", handleClick);
            }
          };
          document.addEventListener("click", handleClick);
        }, 1000);
      }
    });

    onMounted(() => {
      checkWindowWidth();
      fetchCategories();
      fetchProducts();
    });

    return {
      categories,
      loadingCategories,
      filteredProducts,
      loadingProducts,
      activeCategory,
      filterProductsByCategory,
      orderAsc,
      orderBy,
      orderByOptions,
      showSearchBar,
      searchProduct,
      handleShowSearchBar
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
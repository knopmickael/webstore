<template>
  <Store :category="categorySlug" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import Store from '@/components/Store.vue'
const route = useRoute()
const categorySlug = route.params.slug
</script>
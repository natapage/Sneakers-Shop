<script setup>
import Card from '../components/Card.vue'
import { inject } from 'vue'

defineProps({
  items: Array
})

const addToFavourite = inject('addToFavourite')

const emit = defineEmits(['addToCart'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :id="item.id"
      :isFavourite="item.isFavourite"
      :onClickAdd="() => emit('addToCart', item)"
      :onClickFafourite="() => addToFavourite(item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>

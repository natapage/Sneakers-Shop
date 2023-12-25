<script setup>
import Card from '../components/Card.vue'

defineProps({
  items: Array,
  isFavourites: Boolean
})

const emit = defineEmits(['addToCart', 'addToFavourite'])
</script>
<template>
  <div class="grid grid-cols-4 gap-5" v-auto-animate>
    <Card
      v-for="item in items"
      :key="item.id"
      :imageUrl="item.imageUrl"
      :title="item.title"
      :price="item.price"
      :id="item.id"
      :isFavourite="item.isFavourite"
      :onClickAdd="isFavourites ? null : () => emit('addToCart', item)"
      :onClickFafourite="isFavourites ? null : () => emit('addToFavourite', item)"
      :isAdded="item.isAdded"
    />
  </div>
</template>

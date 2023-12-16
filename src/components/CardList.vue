<script setup>
import Card from '../components/Card.vue'
import { inject } from 'vue'

defineProps({
  items: Array
})

const onClickAdd = () => alert(1)

const addToFavourite = inject('addToFavourite')
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
      :isAdded="false"
      :isFavourite="item.isFavourite"
      :onClickAdd="onClickAdd"
      :onClickFafourite="() => addToFavourite(item)"
    />
  </div>
</template>

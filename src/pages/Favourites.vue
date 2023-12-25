<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import CardList from '../components/CardList.vue'

onMounted(async () => {
  try {
    const { data } = await axios.get(
      'https://f52fa0c3a94f53e4.mokky.dev/favourites?_relations=items'
    )
    favourites.value = data.map((obj) => obj.item)
    console.log(favourites.value)
  } catch (err) {
    console.log(err)
  }
})

const favourites = ref([])
</script>
<template>
  <CardList :items="favourites" is-favourites />
</template>

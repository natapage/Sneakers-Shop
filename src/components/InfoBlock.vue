<script setup>
defineProps({
  title: String,
  description: String,
  imageUrl: String
})
</script>

<template>
  <div class="flex flex-col items-center mx-auto mb-6 text-center w-72">
    <img height="70" width="70" :src="imageUrl" alt="Info image" />
    <h2 class="mt-4, font-medium text-2xl">{{ title }}</h2>
    <p class="mt-2 text-gray-400">{{ description }}</p>
  </div>
</template>

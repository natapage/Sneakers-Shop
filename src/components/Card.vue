<script setup>
defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number,
  isFavourite: Boolean,
  isAdded: Boolean,
  onClickAdd: Function,
  onClickFafourite: Function
})
</script>

<template>
  <div
    class="relative p-8 transition bg-white border cursor-pointer border-slate-100 rounded-3xl hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="isFavourite ? '../../public/like-2.svg' : '../../public/like-1.svg'"
      alt="Like"
      class="absolute top-8 left-8"
      @click="onClickFafourite"
    />
    <img :src="imageUrl" alt="sneakers" />

    <p class="mt-2">{{ title }}</p>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400"> ЦЕНА </span>
        <b>{{ price }} руб.</b>
      </div>
      <img
        @click="onClickAdd"
        :src="isAdded ? '../../public/checked.svg' : '../../public/plus.svg'"
        alt="Plus"
      />
    </div>
  </div>
</template>

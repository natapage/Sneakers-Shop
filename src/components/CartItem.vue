<script setup>
const props = defineProps({
  id: Number,
  imageUrl: String,
  title: String,
  price: Number
})

const emit = defineEmits(['onClickRemove'])
</script>
<template>
  <div class="flex gap-4 p-4 border border-slate-100 rounded-xl">
    <img class="w-16 h-16" :src="props.imageUrl" alt="Sneakers" />
    <div class="flex flex-col flex-1">
      <p>{{ props.title }}</p>
      <div class="flex justify-between mt-2">
        <b class="flex-1">{{ props.price }} руб.</b>
        <img
          @click="emit('onClickRemove')"
          class="cursor-pointer opacity-40 hover:opacity-100"
          src="../../public/close.svg"
        />
      </div>
    </div>
  </div>
</template>

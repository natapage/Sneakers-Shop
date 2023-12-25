<script setup>
const emit = defineEmits(['openDrawer'])
defineProps({
  totalPrice: Number
})
</script>
<template>
  <header class="flex justify-between px-8 py-10 border-b cursor-pointer border-slate-300">
    <router-link to="/">
      <div class="flex items-center gap-4">
        <img src="../../public/logo.png" class="w-10" alt="logo" />
        <div>
          <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
          <p class="text-slate-400">Магазин лучших кроссовок</p>
        </div>
      </div>
    </router-link>
    <ul class="flex items-center gap-10">
      <li
        @click="() => emit('openDrawer')"
        class="flex items-center gap-3 text-slate-500 hover:text-black"
      >
        <img src="../../public/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <router-link to="/favourites">
        <li class="flex items-center gap-3 text-slate-500 hover:text-black">
          <img src="../../public/heart.svg" alt="Cart" />
          <span>Закладки</span>
        </li>
      </router-link>
      <li class="flex items-center gap-3 text-slate-500 hover:text-black">
        <img src="../../public/profile.svg" alt="Cart" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

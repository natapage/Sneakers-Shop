<script setup>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import { ref, watch, provide, computed } from 'vue'

const cart = ref([])
const isDrawerOpen = ref(false)

const taxValue = computed(() => {
  return totalPrice.value * 0.05
})

const totalPrice = computed(() => {
  return cart.value.reduce((acc, item) => {
    acc += item.price
    return acc
  }, 0)
})

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <Drawer v-if="isDrawerOpen" :totalPrice="totalPrice" :taxValue="taxValue" />
  <div class="w-4/5 m-auto bg-white shadow-xl rounded-xl mt-14">
    <Header @open-drawer="openDrawer" :totalPrice="totalPrice" />
    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>

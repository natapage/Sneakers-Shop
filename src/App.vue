<script setup>
import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'
import Home from '../src/pages/Home.vue'
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

const cart = ref([])
const isCreatingOrder = ref(false)
const isDrawerOpen = ref(false)

const isCardEmpty = computed(() => cart.value.length === 0)
const taxValue = computed(() => {
  return totalPrice.value * 0.05
})

const cartButtonDisabled = computed(() => isCreatingOrder.value || isCardEmpty.value)

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

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://f52fa0c3a94f53e4.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        parentId: item.id
      }
      item.isFavourite = true
      const { data } = await axios.post('https://f52fa0c3a94f53e4.mokky.dev/favourites', obj)

      item.favouriteId = data.id
    } else {
      item.isFavourite = false
      await axios.delete(`https://f52fa0c3a94f53e4.mokky.dev/favourites/${item.favouriteId}`)
      item.favouriteId = null
    }
  } catch (err) {
    console.log(err)
  }
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('addToFavourite', addToFavourite)
provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })
</script>

<template>
  <Drawer
    v-if="isDrawerOpen"
    :totalPrice="totalPrice"
    :taxValue="taxValue"
    @createOrder="createOrder"
    :cartButtonDisabled="cartButtonDisabled"
  />
  <div class="w-4/5 m-auto bg-white shadow-xl rounded-xl mt-14">
    <Header @open-drawer="openDrawer" :totalPrice="totalPrice" />
    <div class="p-10">
      <Home />
    </div>
  </div>
</template>

<style scoped></style>

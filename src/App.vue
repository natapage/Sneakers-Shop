<script setup>
import Header from './components/Header.vue'
import CardList from './components/CardList.vue'
import axios from 'axios'
import { onMounted, ref, watch, reactive, provide, computed } from 'vue'
import Drawer from './components/Drawer.vue'

const items = ref([])

const isDrawerOpen = ref(false)

const cart = ref([])

const totalPrice = computed(() => {
  return items.value.reduce((acc, item) => {
    if (item.isAdded) {
      acc += item.price
    }
    return acc
  }, 0)
})

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf, 1)
  item.isAdded = false
}

const addToCart = (item) => {
  cart.value.push(item)
  item.isAdded = true
}

const onCLickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const closeDrawer = () => {
  isDrawerOpen.value = false
}

const openDrawer = () => {
  isDrawerOpen.value = true
}

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
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

provide('addToFavourite', addToFavourite)
provide('cart', { cart, closeDrawer, openDrawer, addToCart, removeFromCart })

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get('https://f52fa0c3a94f53e4.mokky.dev/favourites')
    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.parentId === item.id)

      if (!favourite) {
        return item
      }
      return {
        ...item,
        isFavourite: true,
        favouriteId: favourite.id
      }
    })
  } catch (err) {
    console.log(err)
  }
}
const createOrder = async () => {
  try {
    const { data } = await axios.post('https://f52fa0c3a94f53e4.mokky.dev/orders', {
      items: cart.value,
      totalPrice: totalPrice.value
    })
    cart.value = []
    return data
  } catch (err) {
    console.log(err)
  }
}

const fetchItems = async () => {
  const params = {
    sortBy: filters.sortBy
  }

  if (filters.searchQuery) {
    params.title = `*${filters.searchQuery}*`
  }

  try {
    const { data } = await axios.get('https://f52fa0c3a94f53e4.mokky.dev/items', { params })
    items.value = data.map((obj) => ({
      ...obj,
      isFavourite: false,
      favouriteId: null,
      isAdded: false
    }))
  } catch (err) {
    console.log(err)
  }
}

onMounted(async () => {
  await fetchItems()
  await fetchFavourites()
  console.log(items)
})

watch(filters, fetchItems)
</script>

<template>
  <Drawer v-if="isDrawerOpen" :totalPrice="totalPrice" @createOrder="createOrder" />
  <div class="w-4/5 m-auto bg-white shadow-xl rounded-xl mt-14">
    <Header @open-drawer="openDrawer" :totalPrice="totalPrice" />
    <div class="p-10">
      <div class="flex items-center justify-between">
        <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
        <div class="flex gap-4">
          <select
            @change="onChangeSelect"
            class="px-3 py-2 bg-white border rounded-md outline-none"
          >
            <option value="name">По названию</option>
            <option value="-price">Сначала дорогие</option>
            <option value="price">Слачала дешевые</option>
          </select>

          <div class="relative">
            <img src="../public/search.svg" class="absolute left-3 top-3.5" />
            <input
              @input="onChangeInput"
              class="py-2 pr-4 border border-gray-400 rounded-md pl-11 focus:"
              placeholder="Поиск..."
            />
          </div>
        </div>
      </div>
      <CardList :items="items" @add-to-cart="onCLickAddPlus" />
    </div>
  </div>
</template>

<style scoped></style>

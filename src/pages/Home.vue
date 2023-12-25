<script setup>
import CardList from '../components/CardList.vue'
import { inject, reactive, ref, onMounted, watch } from 'vue'
import axios from 'axios'

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  await fetchFavourites()
  console.log(items)
})

const items = ref([])

const { cart, addToCart, removeFromCart } = inject('cart')

const filters = reactive({
  sortBy: 'title',
  searchQuery: ''
})

const onCLickAddPlus = (item) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  filters.sortBy = event.target.value
}

const onChangeInput = (event) => {
  filters.searchQuery = event.target.value
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

const fetchFavourites = async () => {
  try {
    const { data: favourites } = await axios.get('https://f52fa0c3a94f53e4.mokky.dev/favourites')
    items.value = items.value.map((item) => {
      const favourite = favourites.find((favourite) => favourite.item_id === item.id)

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

const addToFavourite = async (item) => {
  try {
    if (!item.isFavourite) {
      const obj = {
        item_id: item.id
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

watch(filters, fetchItems)

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    isAdded: false
  }))
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="mb-8 text-3xl font-bold">Все кроссовки</h2>
    <div class="flex gap-4">
      <select @change="onChangeSelect" class="px-3 py-2 bg-white border rounded-md outline-none">
        <option value="name">По названию</option>
        <option value="-price">Сначала дорогие</option>
        <option value="price">Слачала дешевые</option>
      </select>

      <div class="relative">
        <img src="../../public/search.svg" class="absolute left-3 top-3.5" />
        <input
          @input="onChangeInput"
          class="py-2 pr-4 border border-gray-400 rounded-md pl-11 focus:"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <CardList :items="items" @add-to-cart="onCLickAddPlus" @addToFavourite="addToFavourite" />
</template>

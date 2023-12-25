<script setup>
import DrawerHead from '../components/DrawerHead.vue'
import CartItemList from '../components/CartItemList.vue'
import InfoBlock from '../components/InfoBlock.vue'
import { ref, inject } from 'vue'
import axios from 'axios'

const props = defineProps({
  totalPrice: Number,
  taxValue: Number
})

const { cart } = inject('cart')

const isCreatingOrder = ref(false)
const orderId = ref(null)

const createOrder = async () => {
  try {
    isCreatingOrder.value = true
    const { data } = await axios.post('https://f52fa0c3a94f53e4.mokky.dev/orders', {
      items: cart.value,
      totalPrice: props.totalPrice
    })
    orderId.value = data.id
    cart.value = []
    return data
  } catch (err) {
    console.log(err)
  } finally {
    isCreatingOrder.value = false
  }
}
</script>

<template>
  <div class="fixed top-0 z-10 w-full h-full bg-black top-left opacity-70"></div>
  <div class="fixed top-0 right-0 z-20 h-full p-8 bg-white w-96">
    <DrawerHead />
    <CartItemList />
    <InfoBlock
      v-if="totalPrice === 0 && !orderId"
      description="Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ"
      imageUrl="../../public/package-icon.png"
      title="Корзина пуста"
    />
    <InfoBlock
      v-if="orderId"
      :description="`Ваш заказ ${orderId} скоро будет передан курьерской доставке!`"
      imageUrl="../../public/order-success-icon.png"
      title="Заказ оформлен!"
    />
    <div v-if="totalPrice" class="flex flex-col gap-2">
      <div class="flex items-end gap-2">
        <span>Итого</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>
      <div class="flex items-end gap-2">
        <span>Налог 5%</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ taxValue }} ₽</b>
      </div>

      <button
        @click="createOrder"
        :disabled="totalPrice ? false : true"
        class="disabled:bg-slate-300 flex items-center justify-center w-full h-[55px] bg-lime-400 border rounded-xl mt-5"
      >
        <div class="flex items-center justify-center gap-4">
          <span class="text-xl font-bold text-white">Оформить заказ</span>
          <svg
            width="16"
            height="14"
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 7H14.7143"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M8.71436 1L14.7144 7L8.71436 13"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </button>
    </div>
  </div>
</template>

<script setup>
import DrawerHead from '../components/DrawerHead.vue'
import CartItemList from '../components/CartItemList.vue'
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['createOrder'])
</script>

<template>
  <div class="fixed top-0 z-10 w-full h-full bg-black top-left opacity-70"></div>
  <div class="fixed top-0 right-0 z-20 h-full p-8 bg-white w-96">
    <DrawerHead />
    <CartItemList />
    <div class="flex flex-col gap-2">
      <div class="flex items-end gap-2">
        <span>Итого</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice }} ₽</b>
      </div>
      <div class="flex items-end gap-2">
        <span>Налог 5%</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalPrice * 0.05 }} ₽</b>
      </div>
      <button
        @click="() => emit('createOrder')"
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

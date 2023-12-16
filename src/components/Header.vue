<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-10 cursor-pointer">
    <div class="flex items-center gap-4">
      <img src="../../public/logo.png" class="w-10" alt="logo" />
      <div>
        <h2 class="uppercase text-xl font-bold">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>
    <ul class="flex items-center gap-10">
      <li class="flex items-center gap-3 text-slate-500 hover:text-black">
        <img src="../../public/cart.svg" alt="Cart" />
        <b>1205 pуб.</b>
      </li>
      <li class="flex items-center gap-3 text-slate-500 hover:text-black">
        <img src="../../public/heart.svg" alt="Cart" />
        <span>Закладки</span>
      </li>
      <li class="flex items-center gap-3 text-slate-500 hover:text-black">
        <img src="../../public/profile.svg" alt="Cart" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>

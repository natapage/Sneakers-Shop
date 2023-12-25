import Home from './pages/Home.vue'
import Favourites from './pages/Favourites.vue'
import App from './App.vue'
import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: Home },
  {
    path: '/favourites',
    name: 'Favourites',
    component: Favourites
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).use(autoAnimatePlugin).mount('#app')

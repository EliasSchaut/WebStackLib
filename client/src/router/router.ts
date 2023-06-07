import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ResetView from '@/views/ResetView.vue'
import ResetRequestView from '@/views/ResetRequestView.vue'
import RegisterView from '@/views/RegisterView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PrivacyView from '@/views/PrivacyView.vue'
import { log_out } from "@/util/graphql";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login/:challenge?',
      name: 'login',
      component: LoginView
    },
    {
      path: '/reset',
      name: 'reset_request',
      component: ResetRequestView
    },
    {
      path: '/reset/:challenge',
      name: 'reset',
      component: ResetView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/privacy',
      name: 'privacy',
      component: PrivacyView
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    log_out()
    return router.push('/')
  } else {
    return next()
  }
})

export default router

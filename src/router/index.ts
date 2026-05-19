import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/auth/LoginView.vue')
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/auth/RegisterView.vue')
        },
        {
            path: '/verify-email',
            name: 'verify-email',
            component: () => import('../views/auth/VerifyEmailView.vue')
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/dashboard/DashboardView.vue'),
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach((to) => {
    if (to.meta.requiresAuth && !localStorage.getItem('token')) {
        return '/login'
    }

    return true
})

export default router
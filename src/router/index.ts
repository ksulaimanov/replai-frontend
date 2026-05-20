import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
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
        },
        {
            path: '/automation',
            name: 'automation',
            component: () => import('../views/dashboard/AutomationView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/integrations',
            name: 'integrations',
            component: () => import('../views/dashboard/IntegrationsView.vue'),
            meta: { requiresAuth: true }
        },
        {
            path: '/test-ai',
            name: 'test-ai',
            component: () => import('../views/dashboard/TestAIView.vue'),
            meta: { requiresAuth: true }
        }
    ]
})

router.beforeEach((to) => {
    const authStore = useAuthStore()
    authStore.hydrate()

    if (to.meta.requiresAuth && !authStore.token) {
        return '/login'
    }

    return true
})

export default router
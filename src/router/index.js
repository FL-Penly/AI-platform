import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'main',
            component: () => import('@/views/MainView.vue'),
            children: [
                {
                    path: '',
                    name: 'index',
                    component: () => import('@/components/main/IndexPage.vue')
                },{
                    path: '/classify',
                    name: 'classify',
                    component: () => import('@/components/main/ClassifyPage.vue')
                },{
                    path: '/detect',
                    name: 'detect',
                    component: () => import('@/components/main/DetectionPage.vue')
                },{
                    path: '/segment',
                    name: 'segment',
                    component: () => import('@/components/main/SegmentPage.vue')
                }
            ]
        }
    ]
})

export default router

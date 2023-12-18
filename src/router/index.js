// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/home',
    redirect: '/login',
    component: () => import('@/layouts/mainLayout.vue'),
    children: [

      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: {
          title: "Início",
        }
      },
      {
        path: '/adicionarComentario',
        name: 'adicionarComentario',
        component: () => import('@/views/CommentForm.vue'),
        meta: {
          title: "Criar novos comentarios",
        }
      },
    ]
  },
  {
      
        path: '/login',
        name: 'Login',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/layouts/Login.vue'),
  
  },
  {
      
        path: '/cadastro',
        name: 'cadastro',
        // route level code-splitting
        // this generates a separate chunk (Home-[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('@/layouts/Register.vue'),
  
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

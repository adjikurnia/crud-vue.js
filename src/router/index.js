import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import MasterPengguna from "@/views/master_pengguna/MasterPengguna"
import UpdatePengguna from "@/views/master_pengguna/UpdatePengguna"
import TambahPengguna from "@/views/master_pengguna/TambahPengguna"
import DetailPengguna from "@/views/master_pengguna/DetailPengguna"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/master-pengguna',
    name: 'MasterPengguna',
    component: MasterPengguna
  },
  {
    path: '/tambah-pengguna',
    name: 'TambahPengguna',
    component: TambahPengguna
  },
  {
    path: '/update-pengguna/:id',
    name: 'UpdatePengguna',
    component: UpdatePengguna
  },
  {
    path: '/detail-pengguna/:id',
    name: 'DetailPengguna',
    component: DetailPengguna
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

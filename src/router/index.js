import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/Login'
import Create from '@/components/create/Create'
import Detail from '@/components/detail/Detail'
import List from '@/components/list/List'
import Tag from '@/components/tag/Tag'
import Home from '@/components/home/Home'
import Favorite from '@/components/favorite/Favorite'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/create',
      name: 'Create',
      component: Create
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/tag',
      name: 'Tag',
      component: Tag
    },
    {
      path: '/favorite',
      name: 'Favorite',
      component: Favorite
    }
  ]
})

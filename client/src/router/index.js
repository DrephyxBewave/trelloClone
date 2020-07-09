import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Boards from '../views/Boards.vue';
import store from '../store';

Vue.use(VueRouter);
// new comment
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter(to, from, next) {
      store.dispatch('auth/authenticate').then(() => {
        next('/boards');
      }).catch((e) => {
        console.error('Authentication error, can not connect you to home', e);
        next('/login');
      });
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/boards',
    name: 'boards',
    component: Boards,
    beforeEnter(to, from, next) {
      store.dispatch('auth/authenticate').then(() => {
        next('/boards');
      }).catch((e) => {
        console.error('Authentication error', e);
        next('/login');
      });
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;

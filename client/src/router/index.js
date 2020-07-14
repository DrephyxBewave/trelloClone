import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Signup from '../views/Signup.vue';
import Login from '../views/Login.vue';
import Boards from '../views/Boards.vue';
import store from '../store';
import Board from '../views/Board.vue';

Vue.use(VueRouter);
// new comment
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
  },
  {
    path: '/boards/:id',
    name: 'board',
    component: Board,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// Global session route dispatching
router.beforeEach((to, from, next) => {
  // Authenticate with the jwt
  store.dispatch('auth/authenticate').then(() => {
    if (['/', '/signup', '/login'].includes(to.path)) {
      next('/boards');
    } else {
      next();
    }
  }).catch(() => {
    if (['/', '/signup', '/login'].includes(to.path)) {
      next();
    } else {
      next('/login');
    }
  });
});

export default router;

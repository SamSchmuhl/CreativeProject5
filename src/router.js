import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Register from './views/Register.vue'
import MyPage from './views/MyPage.vue'
import Login from './views/Login.vue'
import Photo from './views/Photo.vue'
import Overview from './views/Overview.vue'
import Regions from './views/Regions.vue'
import Factions from './views/Factions.vue'
import Artifacts from './views/Artifacts.vue'
import People from './views/People.vue'
import Rules from './views/Rules.vue'
import Players from './views/Players.vue'

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: MyPage,
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/photo',
      name: 'photo',
      component: Photo
    },
    {
      path: '/overview',
      name: 'overview',
      component: Overview
    },
    {
      path: '/regions',
      name: 'regions',
      component: Regions
    },
    {
      path: '/factions',
      name: 'factions',
      component: Factions
    },
    {
      path: '/people',
      name: 'people',
      component: People
    },
    {
      path: '/artifacts',
      name: 'artifacts',
      component: Artifacts
    },
    {
      path: '/players',
      name: 'players',
      component: Players
    },
  ]
});

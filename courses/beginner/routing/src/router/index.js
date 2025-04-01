import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import User from '../views/User.vue';
import Event from '../views/Event.vue';
import NotFoundComponent from '../views/NotFoundComponent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue') // since About is imported here, we do not need to import the component earlier
  },
  // redirecting
  // ex.: if another page is using /about-us to direct to the About page, we can specify to redirect to the route name called 'About'
  {
    path: '/about-us',
    redirect: { name: 'About' }
  },
  // dynamic routing
  {
    path: '/user/:username', // :username is a dynamic segment, tells Vue anything after /user/: is a dynamic route
    name: 'User',
    component: User
  },
  {
    path: '/event/:id',
    name: 'Event',
    component: Event,
    props: true
  },
  // catch all
  {
    path: '*',
    component: NotFoundComponent
  }
];

const router = new VueRouter({
  routes,
  // enabled history mode: removes the /#/ from the url and uses browser's `history.pushstate` API to change the URL without reloading the page.
  // not default due to old browser supporting the `history.pushstate` API (IE <= 9)
  mode: 'history'
});

export default router;

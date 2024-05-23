import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
//import CouchDetail from './pages/coaches/CouchDetail.vue';
import CouchesList from './pages/coaches/CouchesList.vue';
//import CouachRegistration from './pages/coaches/CouachRegistration.vue';
//import ContactCoach from './pages/requests/ContactCoach.vue';
//import RequestsReceive from './pages/requests/RequestsReceive.vue';
import NotFound from './pages/NotFound.vue';
//import UserAuth from './pages/auth/UserAuth.vue';
import store from './store/index.js'


const CouchDetail = defineAsyncComponent(()=> import('./pages/coaches/CouchDetail.vue'))
const CouachRegistration =  defineAsyncComponent(()=> import('./pages/coaches/CouachRegistration.vue'))
const ContactCoach =  defineAsyncComponent(()=> import('./pages/requests/ContactCoach.vue'))
const RequestsReceive =  defineAsyncComponent(()=> import('./pages/requests/RequestsReceive.vue'))
const UserAuth =  defineAsyncComponent(()=> import('./pages/auth/UserAuth.vue'))

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/coaches' },
    { path: '/coaches', component: CouchesList },
    {
      path: '/coaches/:id',
      component: CouchDetail,
      props: true,
      children: [
        { path: 'contact', component: ContactCoach }, // /coaches/c1/contact
      ],
    },
    { path: '/register', component: CouachRegistration ,meta :{requiresAuth : true}},
    { path: '/requests', component: RequestsReceive ,meta :{requiresAuth : true} },
    { path: '/auth', component: UserAuth ,meta :{requiresUnauth : true}},
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

router.beforeEach(function(to,_,next){
if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
  next('/auth')
} else if(to.meta.requiresUnauth && store.getters.isAuthenticated ){
  next('/coaches')
} else {
  next()
}
})

export default router;

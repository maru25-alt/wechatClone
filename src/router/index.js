import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MessageBox from '../components/home/MessageBox.vue'
import ContactDetails from '../components/contacts/ContactDetails.vue'
import {localStorageVariables} from '../store/localStorege'
Vue.use(VueRouter)

const isAuthenticated = localStorage.getItem(localStorageVariables.userUID) ? true : false

const authRoutes =
  {
    path: '/account',
    name: "Account",
    component: () => import('../views/Account.vue'),
    children: [
      {
        path: 'signin',
        name: "Signin",
        component: () => import('../views/Signin.vue'),
      },
      {
        path: 'signup',
        name: "Signup",
        component: () => import('../views/Signup.vue')
      }
        
     
    ]
  }


const routes = [
  {
    path: '/',
    name: 'Home',
    icon: " mdi-chat-outline",
    component: Home,
    children:[
      {
        path: "/chat/:id",
        name: 'Chat',
        components:{
          home: MessageBox
        }
      }  
    ]
  },
  {
    path: '/contact',
    name: "Contacts",
    icon: "mdi-account-details-outline",
    component: () => import('../views/Contacts.vue'),
    children: [
      {
        path: "/contact/:id",
        name: "Contact",
        components: {
            contact: ContactDetails
        }
      }
    ]
  },
  {
    path: '/files',
    name: "Files",
    icon: "mdi-folder-multiple-outline",
    component: () => import('../views/Files.vue')
  },
  {
    path: '/favorites',
    name: "Favourites",
    icon: " mdi-package-variant-closed",
    component: () => import('../views/Favorites.vue')
  }
  
]


const constantRoutes = [
  ...routes, authRoutes
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes
})

// router.beforeEach((to, from, next) => {
//     if ((to.name !== 'Account') && !isAuthenticated) next({ name: 'Account' })
//     else next()
// });



export {routes}

export default router

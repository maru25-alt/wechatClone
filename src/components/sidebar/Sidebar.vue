<template>
   <header class="sidebar">
       <div class="icons__container">
            <v-btn  v-for="icon in icons" :key="icon.id"
                fab
                :color="icon.color"
                class="icon-button"
                >
                <v-icon class="icon">{{icon.icon}}</v-icon>
            </v-btn>
       </div>
       <div class="sidebar__navigation">
                <profile></profile>
        
             
                    <router-link :to="item.path" v-for="item in appRoutes" :key="item.name" class="nav__link">
                            <v-icon class="icon" data-toggle="tooltip" data-placement="bottom" :title="$t(item.name)">{{item.icon}} </v-icon>
                    </router-link> 
                   
          
       </div>
       <div class="bottom__navs">
          <v-btn text data-toggle="tooltip" data-placement="bottom" :title="$t('Phone')">
              <v-icon class="icon">mdi-cellphone</v-icon>
          </v-btn>
          <Settings></Settings>
       </div>
   </header>
</template>

<script>
import {routes} from '@/router/index.js';
import Settings from '../Settings.vue';
import Profile from './Profile.vue'
export default {
    components: {
        Settings,
        Profile
    },
  data: () => ({
    appRoutes : routes,
    icons: [
        {
            color: "red darken-3",
            icon: "mdi-window-close",
            id: "1"
        },
        {
            color: "amber accent-3",
            icon: "mdi-minus",
            id: "2"
        },
        {
            color: "green darken-1",
            icon: "mdi-arrow-expand",
            id: "3"
        }
    ]
  }),
  computed: {
      defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      },
     
      
  }
}
</script>

<style>

</style>

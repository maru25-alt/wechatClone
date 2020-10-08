<template>
  <v-app class="app">
   <v-app-bar
      dense 
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title> <v-img width="50" class="img-fluid" src='./assets/img/logo.png' alt="logo"></v-img></v-toolbar-title>
      <v-toolbar-title>{{$t('title')}}</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn  :color="currentLang === entry.language ? 'success' : ''" class="ml-5" v-for="entry in languages" :key="entry.title" @click="changeLocale(entry.language)">
                <flag :iso="entry.flag" v-bind:squared="false" /> {{entry.title}}
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
   <v-container grid-list-xs class="main">
       <router-view></router-view>

   </v-container>
      
    
    
   
  </v-app>
</template>

<script>
import SidebarVue from './components/sidebar/Sidebar.vue';
import i18n from '@/plugins/i18n'; 
export default {

  name: 'App',
  components: {
     SidebarVue
  },

  data: () => ({
    languages: [
      { flag: 'us', language: 'en', title: 'English' },
      { flag: 'cn', language: 'cn', title: '中国' }
    ]
  }),
  computed:{
      currentLang(){
         return  i18n.locale
      }
  },
  methods: {
    changeLocale(locale){
      i18n.locale = locale
    }
  }
};
</script>

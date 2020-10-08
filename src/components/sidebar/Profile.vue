<template>
   <v-row justify="center" class="profileModal mb-3">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="500"
      
    >
      <template v-slot:activator="{ on, attrs }">
          <img
               v-bind="attrs"
                v-on="on"
                 class="profile"
                alt="profile"
                :src="profile"
                />
      </template>
      <v-card>
        <v-card-title class="headline">
         {{$t('profile')}}
        </v-card-title>
        <v-card-text>
            <contact-details :id="currentUserId" :userData="userData" :profile="profile" ></contact-details>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click.native="getData"
            :to="{ name: 'Chat', params: { id: currentUserId}}"
          >
           {{$t('message')}}
          </v-btn>

          <v-btn
            color="error"
            text
            @click="dialog = false"
          >
           {{$t('close')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { localStorageVariables } from '../../store/localStorege';
import ContactDetails from './UserDetails'
export default {
    data () {
      return {
        dialog: false,
      }
    },
    components: {
        ContactDetails
    },
    computed: {
      defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      },
      userUrl(){
        
          return localStorage.getItem(localStorageVariables.userPhotoUrl);
      },
       userData(){
           // console.log( this.$store.getters.getUserDetails)
            return this.$store.getters.getCurrentUserDetails
        },
      profile(){
          if(this.userData !== null){
              return this.userUrl
          }
          else{   
              return this.defaultUrl
          } 
      },
      currentUserId(){
           return  localStorage.getItem(localStorageVariables.userUID)
       }
  },
  methods: {

     getData(){
          this.$store.dispatch('getCurrentChatUser', this.currentUserId);
          this.dialog = false
     }
  },
  
    created(){ 
            this.$store.dispatch('getCurrentDetailsUser', this.currentUserId)
        
    }
}
</script>

<style>

</style>

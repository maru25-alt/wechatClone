<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text data-toggle="tooltip" v-bind="attrs" v-on="on"
        data-placement="bottom" :title="$t('Settings')">
                 <v-icon  class="icon">mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline">
            <h6>Account Info:</h6>
        </v-card-title>
        <v-card-text>
            <v-row>
                <v-col>
                   
                    <div>
                        <v-img :src="profile" width="150"></v-img>
                        <h6>{{username}}</h6>
                    </div>
                </v-col>
                <v-col>
                    <v-btn color="success" @click="handleSignOut">Logout</v-btn>
                </v-col>
            </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialog = false"
          >
           Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { localStorageVariables } from './../store/localStorege';
export default {
     data () {
      return {
        dialog: false,
      }
    },
    computed: {
      defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      },
      userUrl(){
          return localStorage.getItem(localStorageVariables.userPhotoUrl);
      },
      profile(){
          if(this.userUrl !== "undefined"){
              return this.userUrl
          }
          else{
              return this.defaultUrl
          }
      },
      username(){
        return localStorage.getItem(localStorageVariables.username)
      }
  },
    methods: {
        handleSignOut(){
            this.$store.dispatch('SignOut')
        }
    }

}
</script>

<style>

</style>

<template>
    <router-link @click.native="getContactDetails" class="chat" :to="{ name: 'Contact', params: { id: id}}" active-class="active">
        <img  :src="data.photoUrl ? data.photoUrl : defaultUrl" alt="user"/>
        <div class="chat__content">
             <h6>{{data.username}}</h6>
        </div>
    </router-link>
</template>

<script>
import  {getFirstName} from '../../util/Filters.js';
export default {
   props: ["data", "id"],
   computed: {
        defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      }
   },
   filters: {
       firstName: getFirstName
   },
   methods: {
       getContactDetails(){
          // console.log('clicked', this.id)
            this.$store.dispatch('getDetailsUser', this.id)
       }
   }

}
</script>

<style>

</style>

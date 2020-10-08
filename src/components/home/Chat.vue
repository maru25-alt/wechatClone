<template>
    <router-link @click.native="GetMessageData" class="chat" :to="{ name: 'Chat', params: { id: id}}" active-class="active">
        <img  :src="data.photoUrl ? data.photoUrl : defaultUrl" alt="user"/>
        <div class="chat__content">
            <div class="chat__contentTop">
                <tr>
                    <td> <h5>{{data.username | firstName}}</h5></td>
                    <td>
                         <h6 v-if="timestamp(data.lastMessage.createdAt.toDate()) === 0" class="small__text">{{moment(data.lastMessage.createdAt.toDate()).format('LT')}} </h6>
                        <h6 v-else-if="timestamp(data.lastMessage.createdAt.toDate()) === 2" class="small__text">Yesterday </h6>
                        <h6 v-else class="small__text">{{moment(data.lastMessage.createdAt.toDate()).format('L')}} </h6>
                    </td>
                </tr>
               
            </div>
            <div class="chat__contentBottom">
                <div class="small__text"> {{data.lastMessage.message}}</div>
               
            </div>
        </div>
    </router-link>
</template>

<script>
import  {getFirstName} from '../../util/Filters.js';
import moment from 'moment'

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
       GetMessageData(){
            this.$store.dispatch('getCurrentChatUser', this.id)
       },
      timestamp(time){
          var end = moment().startOf('day');
          var start = moment(time).startOf('day');
          return (moment.duration(end.diff(start)).days())
       }
     
   }

}
</script>

<style>

</style>

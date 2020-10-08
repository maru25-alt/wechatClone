<template>
<div v-if="message">
    {{timeStamp()}}
    <div v-if="timeStamp(moment(message.createdAt.toDate()).format('dddd')) === true" class="text-center font-weight-light text--secondary"> Today, {{moment(message.createdAt.toDate()).format('h:mm a')}}</div>
     <div v-else-if="timeStamp(moment(message.createdAt.toDate()).format('dddd')) === false" class="text-center font-weight-light text--secondary">Yesterday, {{moment(message.createdAt.toDate()).format('h:mm a')}}</div>
    <div v-else class="text-center font-weight-light text--secondary"> {{moment(message.createdAt.toDate()).format('dddd,  h:mm a')}}</div>
    <div  :class="message.sender ? 'send-message message clearfix':'message clearfix'">
                <div v-if="message.sender" class="message-profile">
                    <img :src="getPhotoUrl(userUrl)" width="50"/>
                </div>
                <div v-else class="message-profile">
                    <img :src="getPhotoUrl(chatUserPhotoUrl)" width="50"/>
                </div>
                <div :class="message.sender ? 'send-message-text message-text':'message-text'">
                    {{message.message}}
                </div> 
    </div>
</div>
</template>

<script>
import { localStorageVariables } from '../../store/localStorege';
import moment from 'moment'
export default {
    props: ["message", "chatUserPhotoUrl"],
    computed: {
        defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      },
      userUrl() {
         // console.log(localStorage.getItem(localStorageVariables.userPhotoUrl))
          return localStorage.getItem(localStorageVariables.userPhotoUrl)
        },
   },
   methods: {
        getPhotoUrl(url){
            var src  = '';
            if(url === null || url === undefined || url === ''){
               src = this.defaultUrl;
            }
            else{
                src = url
            }
           return src
        },
        timeStamp(time){
            //moment(message.createdAt.toDate()).format('dddd')
           // console.log(moment().subtract(1, 'days').format('dddd'))
            if( (moment().format('dddd')) === time){
               return true
            }
            else if(moment().subtract(1, 'days').format('dddd') === time){
                return false
            }
            // return (moment().format('dddd'))

        }
   }

}
</script>

<style>

</style>

<template>
    <div class="messageBox" v-if="chatUser">
        <div class="messageBox__header">
            <h6 >{{chatUser.username | firstName}}</h6>
            <v-icon>mdi-dots-horizontal</v-icon>
        </div>
        <div class="messageBox__body" id="messageDisplay">
             <message v-for="(message ,index) in Messages" :key="index" :message="message"  :chatUserPhotoUrl="chatUser.photoUrl"></message>
            
        </div>
        <div class="messageBox__footer">
                  <form  class="messageBox__form">
                        <div class="messageForm__iconsContainer">
                            <div class="left__icons">
                               <button type="button"  > <v-icon>mdi-emoticon-outline</v-icon></button>
                               <button  type="button"  ><v-icon>mdi-folder-outline</v-icon> </button>
                               <button  type="button" >
                                 <v-icon>mdi-content-cut</v-icon>
                               </button>
                               <button  type="button" ><v-icon>mdi-chat-processing-outline</v-icon> </button>
                            </div>
                            <div class="right__icons">
                                <button  type="button" > <v-icon>mdi-phone-outline</v-icon> </button>
                                <button  type="button" ><v-icon>mdi-video-outline</v-icon> </button>
                            </div>
                        </div> 
                            <textarea v-model="message" 
                            @keydown.enter.exact.prevent
                            @keyup.enter.exact="handleSendMessage"
                            @keydown.enter.shift.exact="newline" class="text__area" rows="3" name="message" :placeholder="$t('Type')"></textarea>       
                   </form>
        </div>
        
    </div>
</template>

<script>
import Message from './Message.vue';
import  {getFirstName} from '../../util/Filters.js';
export default {
    components: {
        Message
    },
    data(){
        return{
            message: ''
        }
    },
    filters: {
       firstName: getFirstName
   },
    computed: {
        chatUser(){
           
            return this.$store.getters.getChatUser[0];
        },
        Messages(){
          // console.log(this.$store.getters.getMessages)
             return this.$store.getters.getMessages;
        }
    },
    updated(){
        var messageDisplay = this.$el.querySelector("#messageDisplay");
        messageDisplay.scrollTop = messageDisplay.scrollHeight; 
    },
    methods: {
        handleSendMessage(){
            if(this.message !== ''){
                this.$store.dispatch('sendMessage', {
                    message: this.message,
                    docId: this.chatUser.id
                })
                this.message = ''
            }
        },
         newline() {
           this.value = `${this.value}\n`;
        },
    }

}
</script>

<style>

</style>

<template>
    <div class="chats">
        <!-- searchBar -->
           <div class="search__section">
                   <form class="search__form">
                    <v-icon class="icon">mdi-magnify</v-icon>
                    <input
                        class="search__input"
                         type="text"
                        outlined
                        v-model="search"
                        clear-icon="mdi-close-circle"
                        clearable
                        placeholder="Search"
                        append-icon="mdi-magnify"
                        @click:clear="clearMessage"
                    />
                  
                    </form>
                   <button outlined class="btn btn-sm btn-outline-secondary">
                       <v-icon class="icon">mdi-plus</v-icon>
                   </button>
           </div> 
           <div class="chats__container">
                  <contact v-for="chat in Chats" :key="chat.id" :id="chat.id" :data="chat"></contact>       
           </div>
        
        

        <!-- chats -->
    </div>
</template>

<script>
import Contact from './Contact.vue'
export default {
    data: () => {
        return{
           search: ""
        }
    },
    components: {
        Contact
    },
    computed: {
        Chats(){
           // console.log(this.$store.getters.getChats)
            return this.$store.getters.getChats;
        }
    },
    created(){
       this.$store.dispatch('getUsers')
    },

    methods: {
        clearMessage () {
        this.message = ''
      },
    }

}
</script>

<style>

</style>

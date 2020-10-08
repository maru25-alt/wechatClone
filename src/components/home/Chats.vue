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
                        :placeholder="$t('Search') + '...'"
                        append-icon="mdi-magnify"
                        @click:clear="clearSearch"
                    />
                    </form>
                   <button outlined class="btn search__button btn-outline-secondary">
                       <v-icon class="icon">mdi-plus</v-icon>
                   </button>
           </div> 
           <div class="chats__container">
                  <chat v-for="chat in queryChats" :key="chat.id" :id="chat.id" :data="chat"></chat>       
           </div>
        
        

        <!-- chats -->
    </div>
</template>

<script>
import Chat from './Chat.vue'
export default {
    data: () => {
        return{
           search: ""
        }
    },
    components: {
        Chat
    },
    computed: {
        Chats(){
           // console.log(this.$store.getters.getChats)
            return this.$store.getters.getChats;
        },
        queryChats(){
            if(this.search){
            return this.Chats.filter((item)=>{
                return this.search.toLowerCase().split(' ').every(v => item.username.toLowerCase().includes(v))
            })
            }else{
                return this.Chats;
            }
        }
    },
    created(){
       this.$store.dispatch('getUsers')
    },

    methods: {
     clearSearch () {
        this.search = ''
      },
      
    }

}
</script>

<style>

</style>

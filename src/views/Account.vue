<template>
    <div class="account">
         <signin @changeView="handleChangeView"  v-if="view === true"></signin>
         <signup  @changeView="handleChangeView" v-else-if="view === false"></signup>
           <div v-else class="landing__page">
               <img src="https://miro.medium.com/max/570/1*d7kMM6Pef4ZNnBYCwDb7AA.jpeg" alt="">
               <div class="landing__pageContent">
                   <div class="heading">
                       <img src="../assets/img/logo.png"  alt="">
                       <h6> {{$t('welcomeMsg')}}</h6>
                   </div>

                   <div class="footer">
                       <v-btn @click="handleChangeView(true)" color="success">{{$t('signin')}}</v-btn>
                       <v-btn  @click="handleChangeView(false)" color="error" >{{$t('signup')}}</v-btn>
                   </div>
                  
               </div>
            </div>
    </div>
</template>

<script>
import Signin from './Signin.vue';
import Signup from './Signup.vue';
import {auth} from '../store/index.js'
export default {
    components: {
        Signin,
        Signup
    },
    data() {
        return {
           view: null
        }
    },
    methods:{
       handleChangeView(value){
           this.view = value
       }
    }
    

}
</script>

<style>

</style>

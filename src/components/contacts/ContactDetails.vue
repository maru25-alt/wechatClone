<template>

    <div class="contactDetails" v-if="userData !== null">
        <div class="contactDetails__header mb-5">
           <div >
               <h5  v-if="userData.firstName !== ''">{{userData.firstName}} {{userData.lastName}}</h5>
               <h6>{{userData.username}}</h6>
           </div>

            <img :src="profile(userData.photoUrl)" alt="profile">
        </div>
        <div class="contactDetails__body  mb-5">
            <table>
                <tbody>
                    <tr v-if="userData.region !== ''">
                        <td>Region: </td>
                        <td>{{userData.region}}</td>
                    </tr>
                    <tr>
                        <td>Wechat ID:</td>
                        <td>{{userData.wechatId}}</td>
                    </tr>
                     <tr>
                        <td>Email:</td>
                        <td>{{userData.email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class=" mb-5">
              <v-btn :to="{ name: 'Chat', params: { id: id}}" color="success">Message</v-btn>
        </div>
        
            
        
       
    </div>
</template>

<script>

export default {
    computed:{
        id(){
            return this.$route.params.id
        },
        userData(){
           // console.log( this.$store.getters.getUserDetails)
            return this.$store.getters.getUserDetails
        },
         defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
       },
       
    },
    methods: {
       profile(src){
           if(src !== null){
               return src
           }
           else{
               return this.defaultUrl
           }
       }
    }
}
</script>

<style>

</style>

<template>

    <div class="contactDetails" v-if="userData !== null">
        <div class="contactDetails__header mb-2 align-items-start ">
              <div >
                  <h5  v-if="userData.firstName !== ''">{{userData.firstName}} {{userData.lastName}}</h5>
                  <h6>{{userData.username}}</h6>
                  <img :src="profile" alt="profile">
            </div>
            <div class="ml-10">
             <edit-profile></edit-profile>
            </div>
           
        </div>
         <v-divider></v-divider>
        <div class="contactDetails__body  mb-2">
            <table>
                <tbody>
                    <tr v-if="userData.region !== ''">
                        <td>{{$t('Region')}}: </td>
                        <td>{{userData.region}}</td>
                    </tr>
                    <tr>
                        <td>{{$t('wechatId')}}: </td>
                        <td>{{userData.wechatId}}</td>
                    </tr>
                     <tr>
                        <td>{{$t('Email')}}: </td>
                        <td>{{userData.email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        
        
            
        
       
    </div>
</template>

<script>
import { localStorageVariables } from '../../store/localStorege';
import EditProfile from './EditProfile'
export default {
    props: ["id", "userData", "profile"],
    components: {
        EditProfile
    }

}
</script>

<style>

</style>

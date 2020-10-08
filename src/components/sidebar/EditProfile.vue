<template>
    <v-row justify="center">
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
         <v-btn  v-bind="attrs" v-on="on" v small color="success">{{$t('edit')}}</v-btn>
      </template>
      <v-card>
        <v-toolbar
          dark
          color="success"
        >
          <v-toolbar-title>{{$t('edit')}}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
            icon
            dark
            @click="dialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-alert
              dismissible
              v-if="notifications"
              v-for="notification in notifications" :key="notification.id"
              :type="notification.type"
              >
              {{notification.message}}
          </v-alert>
        <loading v-if="progress" :dialog="progress"></loading>
        <v-row justify="center">
            <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    class="mt-5"
                >
                <v-row>
                    <v-img mr-4 :src="src" alt="profile" width="50"></v-img>
                    <v-file-input
                        :rules="profileRules"
                        accept="image/png, image/jpeg, image/jpg"
                        placeholder="Pick an avatar"
                        prepend-icon="mdi-camera"
                        label="Profile Photo"
                        v-model="file"
                    ></v-file-input>
                    <v-btn @click="UploadProfile" :disabled="progress" v-if="file" x-small color="success">
                       <v-progress-circular v-if="progress"
                          indeterminate
                         size="20"
                        ></v-progress-circular>
                       {{$t('upload')}}
                    </v-btn>
                </v-row>
                    <v-text-field
                    v-model="username"
                    :rules="nameRules"
                    :label="$t('username')"
                    required
                    ></v-text-field>
                     <v-text-field
                    v-model="firstName"
                    :label="$t('firstName')"
                    required
                    ></v-text-field>
                     <v-text-field
                    v-model="lastName"
                    :label="$t('lastName')"
                    required
                    ></v-text-field>

                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    :label="$t('Email')"
                    required
                    ></v-text-field>
                     <v-text-field
                    v-model="wechatId"
                    :rules="wechatIdRules"
                    :label="$t('wechatId')"
                    required
                    ></v-text-field>
                   <div class="form-group">
                        <country-select class="form-control" v-model="country" :country="country" topCountry="US" />
                   </div>
                    <v-btn
                    color="error"
                    class="mr-4"
                    @click="dialog = false"
                    >
                    {{$t('close')}}
                    </v-btn>
                    <v-btn
                    color="success"
                     :disabled="!valid"
                    @click="updateProfile"
                    >
                    {{$t('update')}}
                    </v-btn>
                </v-form>
        </v-row>  
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { localStorageVariables } from '../../store/localStorege';
export default {
    data: () => ({
      dialog: false,
      valid: true,
      file: null,
      profileRules: [
        value => !value || value.size < 2000000 || 'Profile size should be less than 2 MB!',
      ],
      username: '',
      nameRules: [
        v => !!v || 'Username is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      country: "",
      firstName: "",
      lastName: "",
      wechatId: "",

      src: '',
      wechatIdRules: [
        v => !!v || 'wechat id is required',
      ],
      
    }),
    computed:{
         userData(){
           // console.log( this.$store.getters.getUserDetails)
            return this.$store.getters.getCurrentUserDetails
        },
        defaultUrl(){
          return this.$store.getters.getDefaultPhotoUrl
      },
      getPhotoUrl(){
        return localStorage.getItem(localStorageVariables.userPhotoUrl)
      },
      progress(){
        return this.$store.getters.getProgress
      },
      loading(){
         //console.log(this.$store.getters.getLoading)
        return this.$store.getters.getLoading
      },
        notifications(){ 
         
            return this.$store.getters.getNotifications
        },
    },
    methods: {
      UploadProfile(){
        if(this.file !== null || this.file !== {}){
           this.$store.dispatch('uploadProfileUrl', this.file);
           this.src= this.getPhotoUrl !== null ? this.getPhotoUrl : this.defaultUrl;
           this.file = null;
        } 
      },
      validate () {
        this.$refs.form.validate()
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    async updateProfile(){
         this.$refs.form.validate();
      // console.log(this.country)
         await this.$store.dispatch('updateUserData', {
            username: this.username,
           wechatId: this.wechatId,
           username: this.username,
           email: this.email,
           firstName: this.firstName,
           lastName: this.lastName,
           region: this.country,
         });
        // this.dialog = false

      }
    },
    created(){
       // this.nam
        this.firstName = this.userData.firstName;
        this.lastName =  this.userData.lastName;
        this.wechatId = this.userData.wechatId;
        this.country = this.userData.region;
        this.email = this.userData.email;
        this.name = this.userData.name;
        this.username = this.userData.username;
        this.src= this.userData.photoUrl !== null ? this.userData.photoUrl : this.defaultUrl;
    }

}
</script>

<style>

</style>

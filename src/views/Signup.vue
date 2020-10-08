<template>
      <div class="signin">
                <div class="card ">
                    <v-alert
                        dismissible
                        v-if="notifications"
                        v-for="notification in notifications" :key="notification.id"
                        :type="notification.type"
                        >
                        {{notification.message}}
                        </v-alert>
                       
                    <div class="signin__header">
                        <h5> <v-icon>mdi-lock</v-icon> {{$t('createAccount')}}</h5>
                        <a @click="ChangeView" >{{$t('signin')}}</a>
                    </div>
                        <div class="signin__google ">
                            <h6 >{{$t('signinWithGoogle')}}</h6>
                            <button type="button" @click.prevent=" handleSignupWithGoogle" class="btn btn-outline-danger">
                            <i class="fab fa-google-plus-square"></i>
                            Google
                            </button>
                        </div>
                         <v-alert
                            border="right"
                            color="blue-grey"
                            dark
                            v-if="passwordRules"
                            >
                              {{passwordRules}}
                            </v-alert>
                            <loading v-if="loading" :dialog="loading"></loading>
                        <v-form ref="form"
                            v-model="valid"
                            lazy-validation 
                            class="signup__form">
                            <div class=" row justify-content-center align-items-center">
                                <div class="col-sm-6  ">
                                      <input class="form-control " :placeholder="$t('firstName')" type="text" name="firstName"  v-model="firstName"/>
                                      
                                </div>
                                <div class="col-sm-6">
                                     <input class="form-control " :placeholder="$t('lastName')" type="text" name="lastNname"  v-model="lastName" />
                                </div>   
                            </div>
                            <input class="form-control " :placeholder="$t('username')" type="text" name="username"  v-model="username" />
                            <input class="form-control" :placeholder="$t('Email')" type="email" name="email"  v-model="email" />
                             <!-- <input class="form-control" placeholder="Region" type="text" name="name"  /> -->
                             <country-select class="form-control" v-model="country" :country="country" topCountry="US" />
                            <!-- <input class="form-control" placeholder="Phone Number" type="text" name="name"  /> -->
                            <input class="form-control" :placeholder="$t('password')"  type="password" name="password" v-model="password"/>
                            <input class="form-control" :placeholder="$t('confirmPassword')"  type="password" name="confirmpassword" v-model="confirmpassword"/>
                              <!-- <intl-telephone class="form-control"></intl-telephone> -->
                            <!-- <input class="form-control" placeholder="Verification Code" type="text" name="verify"  /> -->
                            <p class="">{{$t(agreeStmnt)}} </p>
                            <span class="d-inline-block" tabindex="0" data-toggle="tooltip" title="button disabled">
                                    <button  
                                    @click.prevent="handleSignupWithEmail" 
                                    :disabled="disabled" type="button"
                                    class="btn "
                                    >
                                   {{$t('createAccount')}}
                                    </button> 
                            </span>
                            
                        </v-form>
                
                </div>
              
            </div>
        
</template>

<script>
import IntlTelephone from '@/util/IntlTelephone.vue'
export default {
    components: {
        IntlTelephone
    }, 
    data () {
      return {
            valid: true,
            country: '',
            phone: '',
            firstName: '',
            email: '',
            password:'',
            lastName: '',
            confirmpassword: '',
            username: '',
            passwordRules: ""
      }
    },
   computed: {
        notifications(){ 
            return this.$store.getters.getNotifications
        },
        loading(){
            console.log(this.$store.getters.getLoading);
             return this.$store.getters.getLoading;
        },
        disabled(){
            if(this.country === '' || this.firstName === '' || this.email === '' || this.password === '' || this.username === '' || this.lastName === ''){
                return true
            }
            return false
        }
   },
  methods: {
      ChangeView(){
            this.$emit('changeView', true)
            
    },
     handleSignupWithGoogle(){
         this.$store.dispatch('SignupUserwithGoogle')
     },
     handleSignupWithEmail(){
          const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
       if(this.password !== this.confirmpassword){
            this.passwordRules = "Password must match"
       }
    //    else if((re.test(this.email))){
    //         this.passwordRules = "Email must be valid"
    //    }
       else{
           this.passwordRules = ""
            this.$store.dispatch('SignUpWithEmail', {
                country: this.country,
                phone: this.phone,
                firstName: this.firstName,
                email: this.email,
                password: this.password,
                lastName: this.lastName,
                confirmpassword: this.confirmpassword,
                username: this.username
         })
       }
        
     }
  }

}
</script>

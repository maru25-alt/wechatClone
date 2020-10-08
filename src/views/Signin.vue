<template>
   <div class=" signin">
      <div class="card">
                     <v-alert
                            dismissible
                            v-if="notifications"
                            v-for="notification in notifications" :key="notification.id"
                            :type="notification.type"
                            >
                            {{notification.message}}
                        </v-alert>
                    <div class="signin__header">
                        <h5> <v-icon>mdi-lock</v-icon>{{$t('signin')}}</h5>
                        <a @click="ChangeView" >{{$t('createAccount')}}</a>
                    </div>
                        <div class="signin__google">
                            <h6>{{$t('signinWithGoogle')}}</h6>
                            <button @click="signinWithGoogle" class="btn btn-outline-danger">
                            <i class="fab fa-google-plus-square"></i>
                            Google
                            </button>
                        </div>
                    <div>
                          <loading v-if="loading" :dialog="loading"></loading>
                        <form  @submit.prevent="signinWithEmail">
                            <div class="form-group row">
                               <label class="col-sm-3 col-form-label">{{$t('Email')}}:</label> 
                                <div class="col-sm-9">
                                      <input class="form-control" :placeholder="$t('Email')" type="email" name="email"  v-model="email"/>
                               </div>
                            </div>
                           <div class="form-group row">
                               <label class="col-sm-3 col-form-label">{{$t('password')}}:</label> 
                               <div class="col-sm-9">
                                      <input class="form-control" :placeholder="$t('password')"  type="password" name="password" v-model="password"/>
                               </div>
                          </div>
                          
                          <div class="form-check offset-sm-3">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                               {{$t('rememberMe')}}
                            </label>
                            </div>
                          <div class="row">
                              <div class=" col-sm-9 offset-sm-3">
                                  <button :disabled="disabled" type="submit" class="btn btn-success">
                                     {{$t('signin')}}
                                   </button>
                              </div>
                             
                          </div>
                          
                        </form>
                    </div>
             
               
            </div>
            </div>
</template>

<script>
export default {
    data(){
        return{
            password: "",
            email: ""
        }
    },
    computed: {
        disabled(){
            if(this.email === '' || this.password === ''){
                 return true
            }
            return false
        },
         notifications(){ 
            return this.$store.getters.getNotifications
        },
        loading(){
             return this.$store.getters.getLoading;
        },
    },
    methods: {
        ChangeView(){
            this.$emit('changeView', false)
           
        },
        signinWithGoogle(){
           
            this.$store.dispatch('SignInWithGoogle')
        },
        signinWithEmail(){

           this.$store.dispatch('SignInwithEmail', {
               email: this.email,
               password: this.password
           })
        }
    }

}
</script>

<style>

</style>

<template>
    <div class="app__container row">
        <sidebar class="d-none d-sm-block d-sm-none d-md-block  col-sm-2 col-md-1"></sidebar>
        <div class="page contacts row  col-sm-10 col-md-11" >
              <contacts class="xs-12 col-sm-4 col-md-3 "></contacts>
             <router-view  class="xs-12 col-sm-8 col-md-9 " name="contact"></router-view>
              
        </div>
    </div>
</template>

<script>
import Contacts from '@/components/contacts/Contacts.vue';

export default {
    components: {
    Contacts
  }

}
</script>

<style>

</style>

<template>
<div class="app__container row">
     <sidebar class="d-none d-sm-block d-sm-none d-md-block  col-sm-2 col-md-1"></sidebar>
    <div class="home col-xs-12 col-sm-10 col-md-11 row">
        <chats class="d-none d-sm-block  col-sm-4 col-md-3"></chats>
        <router-view class="col-xs-12 col-sm-8 col-md-9" name="home"></router-view>
    </div>
  </div>
</template>

<script>
import Chats from '@/components/home/Chats.vue'
export default {
  components: {
   
     Chats
  }

}
</script>

<style>

</style>

        

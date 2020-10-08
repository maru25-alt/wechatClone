<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
          <v-card-text class="text-center py-5">
             <v-progress-circular                
            indeterminate
            color="green"
            ></v-progress-circular>
          </v-card-text>
                        
      </v-card>
    </v-dialog>
  </v-row>
</template>


<script>

  export default {
    props: ["dialog"],
    data () {
      return {
        //dialog: true,
      }
    },
    computed: {
        isDialog(){
            console.log(this.dialog)
            return this.dialog
        }
    }
  }
</script>
<template>
  <div id="app">
    <form @submit.prevent="fandleData">
      <h5 :title="title"> {{title}} </h5>
      <span> {{'store id'}} </span>
      <span v-if="requestState=='requested'">Requested</span>
      <span v-if="requestState=='OK'">Ok</span>
      <span v-if="requestState=='ERR'">Err</span>
      <Input/>
      <!-- <button type="submit">Submit</button> -->
    </form>
  </div>
</template>

<script>
import Input from './Input.vue'

export default {
  name: 'Form',
  props: {
    title: String,
  },
  // mounted(){
  //   this.text = this.data 
  
  // },
  computed: {
    requestState(){
      // console.log('form',this.$store.getters)
      return this.$store.getters['InputStateModule/requestState']
    }
  },
  methods:{
    fandleData(){
      // const data = this.$store.getters['InputStateModule/formData']
      // this.$store.commit('InputStateModule/updateValue',data)
      this.$store.dispatch('InputStateModule/submitForm')
    }
  },
  components: {
    Input,
  }
}
</script>

<style>

</style>

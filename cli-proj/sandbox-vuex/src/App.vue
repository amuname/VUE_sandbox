<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    Previos form data : {{data}}
    <Form title="New Form!"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  data: ()=>({
    text:'',
  }),
  computed:{
    data(){
      // console.log('app',this.$store.getters)
      return this.$store.getters['InputStateModule/prevInputState']
    }
  },
  // mounted(){
  //   this.text = this.data 
  
  // },
  components: {
    HelloWorld,
    Form,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

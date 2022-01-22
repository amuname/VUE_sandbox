<template>
  <div class="input" >
    <input @input="change" :value="value">
  </div>
</template>

<script>
export default {
  name: 'Input',
  // props: {
  //   value: String,
  // },
  computed: {
    value(){
      // console.log('form',this.$store.getters)
      return this.$store.getters['InputStateModule/initialInputState']
    }
  },
  methods:{
    change(event){
      this.$store.commit('InputStateModule/concat',event.target.value)
      // console.log(event.target.value)
    }
  },
}
</script>

<style>

</style>
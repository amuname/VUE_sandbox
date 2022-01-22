// const INPUT_DEFAULT_VALUE = 'INPUT_DEFAULT_VALUE'
import {fetchFunc} from '../fetchFunc/fetchFunc.js'

export const InputStateModule = {
  namespaced: true,
  state: () => ({ 
    old_value:'one',
    input_value:'one',
    request_state:'none'
  }),
  mutations: { 
    concat(store,new_value) {
      store.input_value = new_value
    },
    nullValue(){
      this.commit('InputStateModule/concat','')
    },
    updateValue(store,new_value){
      this.commit('InputStateModule/concat',new_value)
      store.old_value = new_value
    },
    requestStateDefault(store){
      store.request_state = 'none'
    },
    requestStateOK(store){
      store.request_state = 'OK'
    },
    requestStateErr(store){
      store.request_state = 'ERR'
    },
    requestStatePending(store){
      store.request_state = 'requested'
    }
  },
  actions: { 
    async submitForm(context){
      context.commit('requestStatePending')
      const request = await fetchFunc()
      // console.log(context)
      if (request == 'OK') {
        const data = context.getters['formData']
        context.commit('updateValue',data)
        context.commit('requestStateOK')
        context.commit('nullValue')
        setTimeout(()=>context.commit('requestStateDefault'),3000)
      }
      if (request == 'ERR'){
        context.commit('requestStateErr')
        setTimeout(()=>context.commit('requestStateDefault'),3000)
      }
      
    }
  },
  getters: { 
    initialInputState:state=>state.input_value,
    prevInputState:state=>state.old_value,
    formData:(state,getters)=>{
      return getters.initialInputState
    },
    requestState:(state)=>{
      return state.request_state
    }
  }
}
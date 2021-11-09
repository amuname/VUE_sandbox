
Vue.component('custom-list-component',{
data:function(){
	return {
		user_list:[],
		// [
		// {id:new Date().value,text:'user text'},
		// ],
		user_text:'',

	}
},
created:function () {
	fetch('/fakedata/f1.json').then(e=>e.json() )
	// .then( list => list.forEach(elem=>this.user_list.push(elem) ) )
	.then( list => this.user_list = list )
},
methods:{
	add_to_list:function(item){
		this.user_list.push(item)
		this.user_text=''
	},
	remove_from_list:function(list_id){
		this.user_list = this.user_list.filter(elem=>elem.id!=list_id)
	},
},
template:`
<div>
	<ol>
		<li v-for="item in user_list" v-bind:key="item.id" v-bind:item="item">
		<span> {{ item.text }} </span>
		<button v-on:click="
		remove_from_list(item.id)
		">X</button>
		</li>
	</ol>
	<input v-model="user_text" type="text"/>
	<button v-if="user_text!=''" v-on:click="
	add_to_list({id: new Date().valueOf(),text:user_text})
	"> Add to List "{{user_text}}" </button>
</div>
`
})






const app = new Vue({
	el:'#app',
	template:'<custom-list-component></custom-list-component>',
})




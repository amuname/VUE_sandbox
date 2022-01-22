
Vue.component('custom-list-component',{
data:function(){
	return {
		user_list:[],
		// [
		// {id:new Date().value,text:'user text'},
		// ],
		user_text:'',
		search_result:[],
		search_result_show:false,
		clicked_search_result:0,
		ref_id:()=>new Date.valueOf(),
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
		this.search_result = []
		this.clicked_search_result=0
	},
	remove_from_list:function(list_id){
		this.user_list = this.user_list.filter(elem=>elem.id!=list_id)
	},
	show_result:async function(){
		if (this.user_text!='') {
			const res = await fetch('/fakedata/search.json')
			const json = await res.json() 
			const s_list = json
			this.search_result = s_list.filter(
				elem=>elem.text.startsWith(this.user_text) 
				) 
			let id_arr=[]
			let arr=[]
			for(let item of this.user_list) id_arr.push(item.id)
			for(let i=0;i<this.search_result.length;i++){
				if ( !id_arr.includes(this.search_result[i].id) ) arr.push(this.search_result[i])
			}
			this.search_result=arr


			if(this.search_result.length>0) this.search_result_show = true


		} else {
			this.search_result_show = false
		}
	},
	choosen_search_result:function (item) {
		this.clicked_search_result = item.id
		this.user_text=item.text
		this.search_result_show = false
	},
	focus_input:function () {
      this.$refs.search_focus.focus();
    },
},
props:['title'],
template:`
<div>
	<p v-bind:title="title"> {{ title }} </p>
	<ol>
		<li v-for="item in user_list" v-bind:key="item.id">
		<span> {{ item.text }} 
		<button v-on:click="
		remove_from_list(item.id)
		">X</button></span>
		</li>
	</ol>
	<form v-on:submit="(e)=>{
	e.preventDefault()
	add_to_list({id: clicked_search_result || new Date().valueOf(),text:user_text})
	}
	">
		<input ref="search_focus" v-model="user_text" v-on:input="show_result" type="text"/>
		<ul v-if="search_result_show">
			<li v-for="item in search_result" v-bind:key="item.id" v-on:click="
			()=>{
				choosen_search_result(item)
				focus_input()
			}
			">
			 {{item.text}} 
			</li>
		</ul>
		<button v-if="user_text!=''"
		> Add to List "{{user_text}}" </button>
	</form>
</div>
`
})

// TO DO add refs?? focus input after search result selected





const app = new Vue({
	el:'#app',
	data:{
		obj_name:'Test obj',
		el_prop:{
			customDataField:"Component description",
			customListComponent:"Here list"
		},
	},
	template:`
	<div>
	<custom-data-field v-bind:title="el_prop.customDataField">
	</custom-data-field>
	<custom-list-component v-bind:title="el_prop.customListComponent">
	</custom-list-component>
	</div>
	`,
})




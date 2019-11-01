import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		vip: ''
	},
	getters: {
//		id(state){
//			return window.sessionStorage.getItem('id')
//		}
	},
	mutations: {
		changeVip(state,val){
			state.vip = val
		}
	},
	actions: {
//		async changeId(state){
//			if(!state.goods){
//				let res = await axios.get('./static/mock/goods.json')
//				console.log(res)
//				state.commit('changeGoods',res.data)
//			}
//		}
	}
})
import Vue from 'vue'

import header from '@/components/header'
import souSuo from '@/components/souSuo'
import box from '@/components/box'

let install = function(Vue, options) {
	Vue.component('my-header', header)
	Vue.component('my-sousuo', souSuo)
	Vue.component('my-box', box)

	Vue.prototype.format = function(time) { //全局函数1
		time = new Date(time)
		return time.getFullYear() + "-" + (time.getMonth() + 1) + "-" + time.getDate()
	}
	
}

export default install;
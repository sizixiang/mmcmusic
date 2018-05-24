//vuex入口文件

import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
//修改state时在控制台打印对应的修改数据
//开发的时候借助这个我们可以在控制台追踪到state更改的各个状态
import createLogger from 'vuex/dist/logger'

//注册vuex插件
Vue.use(Vuex);

//vuex调试工具  严格模式  开发环境返回true 发布环境返回false
const debug = process.env.NODE_ENV !== 'production'

//初始化Vuex.Store实例
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	//高级
	strict: debug,
	plugins: debug?[createLogger()]:[]
})

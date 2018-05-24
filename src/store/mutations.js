//在vuex中要修改state的的状态或者说值，只能通过mutation去修改，mutation是同步的
//在回调函数中进行的状态的改变都是不可追踪的（注意）
//获取常量
import * as types from './mutation-type'

//mutations对象
const mutations = {
	//[types.SET_SINGER]为方法名参数为state singer
	//ES5函数写法  百度搜搜参数解构
	[types.SET_SINGER](state,singer){
		state.singer = singer
	}
}

export default mutations

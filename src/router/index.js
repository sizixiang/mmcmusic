import Vue from 'vue'
import Router from 'vue-router'
import personal from 'components/personal/personal'
import recommend from 'components/recommend/recommend'
import singer from 'components/singer/singer'
import tab from 'components/mctab/mctab'

Vue.use(Router)

export default new Router({
	mode: 'history',
	linkActiveClass: 'active',
	routes: [{
			path: '/',
			redirect: '/recommend'
		},
		{
			path: '/recommend',
			name: 'recommend',
			component: recommend
		},
		{
			path: '/personal',
			name: 'personal',
			component: personal
		},
		{
			path: '/singer',
			name: 'singer',
			component: singer
		}
	]
})
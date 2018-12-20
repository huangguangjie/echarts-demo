import Vue from 'vue'
import Router from 'vue-router'
import Runtime from '@/views/runtime'
import Origin from '@/views/origin'
import Target from '@/views/target'
import Url from '@/views/url'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: 'runtime',
		},
		{
			path: '/runtime',
			name: 'runtime',
			component: Runtime
		},
		{
			path: '/origin',
			name: 'origin',
			component: Origin
		},
		{
			path: '/target',
			name: 'target',
			component: Target
		},
		{
			path: '/url',
			name: 'url',
			component: Target
		}
	]
})

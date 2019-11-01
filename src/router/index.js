import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login'
import reg from '@/pages/reg'
import manage from '@/pages/manage'

import cdAdmin from '@/pages/child/admin'
import cdUser from '@/pages/child/user'
import cdZhuTi from '@/pages/child/zhuTi'
import cdFont from '@/pages/child/font'
import cdMusic from '@/pages/child/music'

import addZhuTi from '@/pages/child/addZhuTi'
import addFont from '@/pages/child/addFont'
import addMusic from '@/pages/child/addMusic'
import finalData from '@/pages/child/finalData'
import backups from '@/pages/child/backups'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/reg',
      name: 'reg',
      component: reg
    },
    {
      path: '/manage',
      component: manage,
      meta: ['首页','商品管理'],
      children: [
      	{
      		path: '',
      		name: 'cdUser',
      		component: cdUser,
      		meta: ['首页','用户详情']
      	},
      	{
      		path: 'cdAdmin',
      		name: 'cdAdmin',
      		component: cdAdmin,
      		meta: ['首页','人员管理']
      	},
      	{
      		path: 'cdZhuTi',
      		name: 'cdZhuTi',
      		component: cdZhuTi,
      		meta: ['首页','商品管理','主题管理']
      	},
      	{
      		path: 'cdFont',
      		name: 'cdFont',
      		component: cdFont,
      		meta: ['首页','商品管理','字体管理']
      	},
      	{
      		path: 'cdMusic',
      		name: 'cdMusic',
      		component: cdMusic,
      		meta: ['首页','商品管理','铃声管理']
      	},
      	{
      		path: 'addZhuTi',
      		name: 'addZhuTi',
      		component: addZhuTi,
      		meta: ['首页','添加商品','添加主题']
      	},
      	{
      		path: 'addFont',
      		name: 'addFont',
      		component: addFont,
      		meta: ['首页','添加商品','添加字体']
      	},
      	{
      		path: 'addMusic',
      		name: 'addMusic',
      		component: addMusic,
      		meta: ['首页','添加商品','添加铃声']
      	},
      	{
      		path: 'backups',
      		name: 'backups',
      		component: backups,
      		meta: ['首页','数据管理','数据备份']
      	},
      	{
      		path: 'finalData',
      		name: 'finalData',
      		component: finalData,
      		meta: ['首页','数据管理','数据恢复']
      	}
      	
      ]
    }
  ]
})

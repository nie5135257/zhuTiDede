<template>
	<div class="manage">
		<el-container>
			<el-aside>
				<el-menu 
					class="el-menu-vertical-demo" 
					@select="handleSelect"
					:default-active='activePath'
					unique-opened
					router
					background-color="#545c64" 
					text-color="#fff" 
					active-text-color="#ffd04b">
					<el-menu-item>
						<i class="el-icon-user-solid"></i>
						<span slot="title">{{ vip }}</span>
					</el-menu-item>
					<el-submenu index="2" v-if='vip==="管理者"'>
						<template slot="title">
							<i class="el-icon-location"></i>
							<span>权限管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/manage/cdAdmin">人员管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title">
							<i class="el-icon-s-promotion"></i>
							<span>用户查阅</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/manage">用户详情</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title">
							<i class="el-icon-s-help"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/manage/cdZhuTi">主题管理</el-menu-item>
							<el-menu-item index="/manage/cdFont">字体管理</el-menu-item>
							<el-menu-item index="/manage/cdMusic">铃声管理</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					
					<el-submenu index="5">
						<template slot="title">
							<i class="el-icon-circle-plus"></i>
							<span>添加商品</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/manage/addZhuTi">主题添加</el-menu-item>
							<el-menu-item index="/manage/addFont">字体添加</el-menu-item>
							<el-menu-item index="/manage/addMusic">铃声添加</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title">
							<i class="el-icon-upload"></i>
							<span>数据管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="/manage/backups">数据备份</el-menu-item>
							<el-menu-item index="/manage/finalData">数据恢复</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header>
					<my-header></my-header>
				</el-header>
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import { mapState, mapMutations } from 'vuex'
	export default {
		data(){
			return{
				activePath: '/manage'
			}
		},
		methods: {
			...mapMutations(['changeVip']),
			handleSelect(index,indexPath){
				window.sessionStorage.setItem('path',index)
			}
		},
		computed: {
			...mapState(['vip'])
			
		},
		created(){
			this.activePath = window.sessionStorage.getItem('path')
			this.changeVip(window.sessionStorage.getItem('vip'))
		}
	}
</script>

<style scoped="scoped" lang="less">
	.el-container {
		height: 100%;
	}
	
	.el-header,
	.el-footer {
		background-color: #fff;
		color: #333;
		text-align: center;
		line-height: 60px;
	}
	
	.el-aside {
		background-color: #D3DCE6;
		color: #333;
		overflow-x: hidden;
		/*text-align: center;*/
		/*line-height: 200px;*/
	}
	
	.el-main {
		background-color: #E9EEF3;
		color: #333;
		height: 100%;
		/*text-align: center;*/
	}
	
	body>.el-container {
		margin-bottom: 40px;
	}
	
	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}
	
	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
	
	.manage {
		height: 100%;
		.el-menu{
			height: 100%;
			.one{
				color: #409EFF;
			}
		}
	}
</style>
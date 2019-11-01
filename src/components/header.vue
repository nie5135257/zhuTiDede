<template>
	<div id="header">
		<div>
			<el-breadcrumb separator="&">
				<el-breadcrumb-item v-for='(i,j) in $route.meta' :key='j'>{{ i }}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div>
			<el-dropdown>
				<el-button type="primary" circle size='small'>
					<i class="el-icon-user-solid"></i>
				</el-button>
				<el-dropdown-menu slot="dropdown">
					<router-link to='/'>
						<el-dropdown-item>切换账号</el-dropdown-item>
					</router-link>
					<router-link to='/reg'>
						<el-dropdown-item>注册</el-dropdown-item>
					</router-link>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>

</template>

<script>
</script>

<style scoped lang="less">
	#header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		
	}
	
	.el-dropdown {
		vertical-align: top;
	}
	
	.el-dropdown+.el-dropdown {
		margin-left: 15px;
	}
	
	.el-icon-arrow-down {
		font-size: 12px;
	}
	a{
		text-decoration: none;
	}
</style>
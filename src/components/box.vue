<template>
	<div id="box"">
		<div class="box">
			<p>主题商店后台管理系统</p>
			<div class="from">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props: []
	}
</script>

<style scoped="scoped" lang="less">
	#box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		overflow: scroll;
		background-color: rgba(170,172,172,.3);
		z-index: 100;
		.box {
			position: fixed;
			top: 40%;
			left: 50%;
			max-height: 70%;
			transform: translate(-50%, -50%);
			width: 40%;
			background-color: #fff;
			
			border-radius: 0.2rem;
			overflow: auto;
			padding: 0.5rem;
			
			>p {
				width: 100%;
				text-align: center;
				padding-bottom: 0.5rem;
				font-size: 0.6rem;
			}
			.from {
				width: 100%;
				p {
					padding: 0.2rem;
				}
				.one {
					width: 100%;
					text-align: center;
					
				}
			}
		}
	}
</style>
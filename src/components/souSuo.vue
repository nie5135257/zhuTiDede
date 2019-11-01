<template>
	<div id="souSuo">
		<div>
			<el-input placeholder="请输入内容" v-model="inputTxt" class="input-with-select">
				<el-select v-model="select" style='width: 2rem;' slot="prepend" placeholder="请选择">
					<el-option v-for='(i,j) in val' :key='j' :label="name[j]" :value="i"></el-option>
				</el-select>
				<el-button @click='souSuo' slot="append" icon="el-icon-search"></el-button>
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['name','val','clr'],
		data() {
			return {
				inputTxt: '',
				select: ''
			}
		},
		computed: {
			inputTxt1(){
				return !this.clr ? this.inputTxt : ''
			},
			select1(){
				return !this.clr ? this.select : ''
			}
		},
		methods: {
			souSuo() {
				let obj = {
					select: this.select,
					inputTxt: this.inputTxt
				}
				if(obj.select && obj.inputTxt){
					this.$emit('input',obj)
				}else{
					this.$message.error('请先搜索条件哦！');
				}
			}
		}
	}
</script>

<style scoped="scoped" lang="less">
	#souSuo {
		margin: 0.5rem 2rem;
		.input-with-select .el-input-group__prepend {
			background-color: #fff;
		}
		.el-input__inner{
			width: 80%;
		}
		
	}
</style>
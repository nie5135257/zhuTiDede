<template>

	<div id="login">
		
		<div class="box">
			<p>主题商店后台管理系统</p>
			<div class="from">
				<el-form 
					:model="ruleForm" 
					status-icon 
					:rules="rules" 
					ref="ruleForm" 
					label-position='left'
					label-width="0" 
					class="demo-ruleForm">
					<el-form-item prop="adminName">
    					<el-input v-model="ruleForm.adminName" placeholder="请输入账号"></el-input>
  					</el-form-item>
					<el-form-item prop="pwd">
						<el-input type="password" v-model="ruleForm.pwd" placeholder="请输入密码">
						</el-input>
					</el-form-item>
						<el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
						<el-button @click="$router.push('/reg')">注册</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
			</el-form>
			</div>
		</div>
	</div>
</template>

<script>
	import  { mapMutations } from 'vuex'
	export default {
		data() {
			return {
				ruleForm: {
					adminName: '',
					pwd: ''
				},
				rules: {
					adminName: [{
							required: true,
							message: '请输入账号',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 12 个字符',
							trigger: 'blur'
						}
					],
					pwd: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 12,
							message: '长度在 3 到 12 个字符',
							trigger: 'blur'
						}
					]
				}
			};
		},
		methods: {
			...mapMutations(['changeVip']),
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if(valid) {
						let res = await this.$http.post('/login',this.ruleForm)
						if(res.data === '管理者'){
							this.$message({
						        message: '恭喜您，登录成功，管理者权限已开启',
						        type: 'success'
					        })
					        window.sessionStorage.setItem('vip',res.data)
					        this.changeVip(window.sessionStorage.getItem('vip'))
					        this.$router.push('/manage')
						}else if(res.data === '管理员'){
							this.$message({
						        message: '恭喜您，登录成功，管理员权限已开启',
						        type: 'success'
					        })
							window.sessionStorage.setItem('vip',res.data)
					        this.changeVip(window.sessionStorage.getItem('vip'))
					        this.$router.push('/manage')
						}else if(res.data === '后台预览'){
							this.$message({
						        message: '恭喜您，登录成功，后台预览权限已开启',
						        type: 'success'
					        })
							window.sessionStorage.setItem('vip',res.data)
					        this.changeVip(window.sessionStorage.getItem('vip'))
					        this.$router.push('/manage')
						}else{
							this.$message({
						        message: res.data,
						        type: 'error'
					        })
						}
						
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			}
		},
		created(){
			window.sessionStorage.clear()
		}
	}
</script>

<style scoped="scoped" lang="less">
	#login {
		height: 100%;
		width: 100%;
		background-color: #ccc;
		.box{
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			width: 40%;
			text-align: center;
			
			>p{
				padding-bottom: 0.5rem;
				font-size: 0.6rem;
			}
			.from{
				background-color: #fff;
				border-radius: 0.2rem;
				padding: 0.5rem;
				p{
					padding: 0.2rem;
				}
			}
		}
		
	}
</style>
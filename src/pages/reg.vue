<template>

	<div id="login">

		<div class="box">
			<p>主题商店后台管理系统</p>
			<div class="from">
				<el-form 
					:model="ruleForm" 
					:rules="rules" ref="ruleForm" 
					label-position='right' 
					label-width="2rem" 
					status-icon
					class="demo-ruleForm">
					<el-form-item label="账号" prop="adminName">
						<el-input v-model="ruleForm.adminName"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="pwd">
						<el-input type="password" v-model="ruleForm.pwd" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="确认密码" prop="checkPwd">
						<el-input type="password" v-model="ruleForm.checkPwd" autocomplete="off"></el-input>
					</el-form-item>
					<el-form-item label="申请权限" prop="resource">
						<el-radio-group v-model="ruleForm.resource">
							<el-radio label="后台预览"></el-radio>
							<el-radio label="管理员"></el-radio>
							<el-radio label="管理者"></el-radio>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="姓名" prop="userName">
						<el-input v-model="ruleForm.userName"></el-input>
					</el-form-item>
					<el-form-item label="地址" prop="address">
						<el-input v-model="ruleForm.address"></el-input>
					</el-form-item>
					<el-form-item label="电话" prop="phone">
						<el-input v-model="ruleForm.phone"></el-input>
					</el-form-item>
					<el-form-item class='one'>
						<el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
						<el-button @click="$router.push('/')">登录</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			var validatePwd = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.ruleForm.checkPwd !== '') {
						this.$refs.ruleForm.validateField('checkPwd');
					}
					callback();
				}
			};
			var validatePwd2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if(value !== this.ruleForm.pwd) {
					callback(new Error('两次输入密码不一致!'));
				} else {
					callback();
				}
			};
			return {
				ruleForm: {
					adminName: '',
					pwd: '',
					checkPwd: '',
					userName: '',
					address: '',
					phone: '',
					resource: ''
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
						validator: validatePwd,
						trigger: 'blur'
					}],
					checkPwd: [{
						required: true,
						validator: validatePwd2,
						trigger: 'blur'
					}],
					resource: [{
						required: true,
						message: '请选择申请权限',
						trigger: 'change'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate(async (valid) => {
					if(valid) {
						let obj = JSON.parse(JSON.stringify(this.ruleForm))
						delete obj.checkPwd
						let res = await this.$http.post('/reg',obj)
						if(res.data === '恭喜您，注册成功！'){
							this.$message({
						        message: res.data,
						        type: 'success'
					       	})
					        this.$router.push('/')
						}else if(res.data === '账号已被占用！'){
							this.$message({
						        message: res.data,
						        type: 'success'
					       	})
						}else{
							this.$message({
						        message: '抱歉，注册失败',
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
		}
	}
</script>

<style scoped="scoped" lang="less">
	#login {
		height: 100%;
		width: 100%;
		background-color: #ccc;
		.box {
			position: fixed;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 40%;
			>p {
				width: 100%;
				padding-bottom: 0.5rem;
				font-size: 0.6rem;
				text-align: center;
			}
			.from {
				background-color: #fff;
				border-radius: 0.2rem;
				padding: 0.5rem;
				p {
					padding: 0.2rem;
				}
				.one {
					text-align: center;
				}
			}
		}
	}
</style>
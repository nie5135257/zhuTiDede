<template>

	<div id="music">

		<div class="box">
			<p>主题商店后台音乐添加</p>
			<div class="from">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="2rem" status-icon class="demo-ruleForm">

					<el-form-item label="标题" prop="ttl">
						<el-input v-model="ruleForm.ttl"></el-input>
					</el-form-item>
					<el-form-item label="描述" prop="ttl1">
						<el-input v-model="ruleForm.ttl1"></el-input>
					</el-form-item>

					
					<el-form-item label="上传音乐" prop="src">
						<el-upload 
							class="upload-demo" 
							:action="$URL+'/uploadMusic'" 
							:on-remove="handleRemove" 
							:on-success = 'addSrc'
							:file-list="fileList" 
							list-type="text">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">
								一次只能上传一个文件，文件名相同会被替换
							</div>
						</el-upload>
					</el-form-item>

					<el-form-item class='one'>
						<el-button type="primary" @click="submitForm('ruleForm')">添加</el-button>
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
			return {
				dialogImageUrl: '',
				dialogVisible: false,
				
				fileList: [],
				ruleForm: {
					ttl: '',
					price: '',
					src: []
				},
				rules: {
					ttl: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					ttl1: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					src: [{
						required: true,
						message: '请选择图片',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			//上传图片
			handleRemove(file, fileList) {
        		this.$http.delete('/delImgFont?name='+file.response).then(res=>{},err=>{})
        		this.ruleForm.src = fileList.map(i=>i.url)
      		},
       		addSrc(response, file, fileList){
       			this.ruleForm.src.push(this.$URL+'/static/music/'+response)
       		},
        	
			
			//数据提交
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						
						this.ruleForm.src = Array.from(new Set(this.ruleForm.src))
						
						if(this.ruleForm.src.length !== 1){
							this.$message({
								type: 'error',
								message: '请选择1一个音乐文件!，文件名相同将会被替代'
							});
						}else{
							this.$http.post('/music/addMusic',this.ruleForm).then(res=>{
								this.$message({
								type: 'error',
								message: res.data
							});
							this.$refs[formName].resetFields();
							this.ruleForm.src = []
							this.fileList = []
							},err=>{
								console.log(err)
							})
						}
						
//						this.$refs[formName].resetFields();
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
	#music {
		height: 100%;
		width: 100%;
		.box {
			position: relative;
			left: 50%;
			transform: translateX(-50%);
			margin: 0.5rem 0;
			width: 60%;
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
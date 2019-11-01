<template>

	<div id="addFont">

		<div class="box">
			<p>主题商店后台字体添加</p>
			<div class="from">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position='right' label-width="2rem" status-icon class="demo-ruleForm">

					<el-form-item label="标题" prop="ttl">
						<el-input v-model="ruleForm.ttl"></el-input>
					</el-form-item>
					<el-form-item label="价格" prop="price">
						<el-input v-model="ruleForm.price"></el-input>
					</el-form-item>

					<el-form-item label="标签" prop="label">
						<el-checkbox-group ref='add' v-model="ruleForm.label">
							<el-checkbox v-for='(i,j) in label' :key='j' :label="i" name="type"></el-checkbox>
						</el-checkbox-group>
					</el-form-item>

					<el-form-item label="添加标签" prop="addValue">
						<el-input v-model="addValue">
							<el-button @click='addLabel' slot="append" icon="el-icon-circle-plus">
							</el-button>
						</el-input>
					</el-form-item>

					<el-form-item label="资源简介1" prop="intro.desc1">
						<el-input type="textarea" v-model="ruleForm.intro.desc1"></el-input>
					</el-form-item>
					<el-form-item label="资源简介2" prop="intro.desc2">
						<el-input type="textarea" v-model="ruleForm.intro.desc2"></el-input>
					</el-form-item>
					<el-form-item label="资源简介3" prop="intro.desc3">
						<el-input type="textarea" v-model="ruleForm.intro.desc3"></el-input>
					</el-form-item>
					<el-form-item label="资源简介4" prop="intro.desc4">
						<el-input type="textarea" v-model="ruleForm.intro.desc4"></el-input>
					</el-form-item>

					<el-form-item label="上传图片" prop="src">
						<el-upload 
							class="upload-demo" 
							:action="$URL+'/uploadFont'" 
							:on-remove="handleRemove" 
							:on-success = 'addSrc'
							multiple
							:file-list="fileList" 
							list-type="picture">
							<el-button size="small" type="primary">点击上传</el-button>
							<div slot="tip" class="el-upload__tip">
								<p>请上传2张图片 （只能上传jpg/png文件，且不超过500kb,文件名相同会被替换）</p>
								<p>第一张图片比例(3:2) 第二张图片比例(3:5)</p>
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
				label: ['精选', '新品', '热门', '文艺', '简约', '清晰'],
				addValue: '',
				
				fileList: [],
				ruleForm: {
					ttl: '',
					price: '',
					label: [],
					intro: {
						desc1: '',
						desc2: '',
						desc3: '',
						desc4: ''
					},
					src: []
				},
				rules: {
					ttl: [{
						required: true,
						message: '请输入标题',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur'
					}],
					label: [{
						required: true,
						message: '请选择标签',
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
       			this.ruleForm.src.push(this.$URL+'/static/imgFont/'+response)
       		},
        	

			//添加标签
			addLabel() {
				let res = this.label.some(i => i == this.addValue)
				if(!res) {
					this.label.push(this.addValue)
					this.addValue = ''
				} else {
					this.$message({
						type: 'success',
						message: this.addValue + '标签已存在!'
					});
					this.addValue = ''
				}

			},
			
			//数据提交
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						
						this.ruleForm.src = Array.from(new Set(this.ruleForm.src))
						this.ruleForm.price = Number(this.ruleForm.price)
						if(this.ruleForm.price !== 'NaN'){
							this.ruleForm.price = this.ruleForm.price.toFixed(1)
						}else{
							this.$message({
								type: 'error',
								message: '价格请输入数字'
							})
						}
						
						if(this.ruleForm.src.length !== 2){
							this.$message({
								type: 'error',
								message: '请选择2张图片!，文件名相同将会被替代'
							});
						}else if(this.ruleForm.price){
							this.$http.post('/font/addFont',this.ruleForm).then(res=>{
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
	#addFont {
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
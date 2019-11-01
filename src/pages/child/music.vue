<template>
	<div id="music">
		<my-sousuo :name='name' :val='val' @input='input'></my-sousuo>
		<el-table :data='music' :stripe='true' style="width: 100%" height='7.54rem'>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="商品名称:">
							<span>{{ props.row.ttl }}</span>
						</el-form-item>
						<el-form-item label="商品描述:">
							<span>{{ props.row.ttl1 }}</span>
						</el-form-item>
						<el-form-item label="下载次数:">
							<span>{{ props.row.download }}万次</span>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="ttl" label="标题">
			</el-table-column>
			<el-table-column prop="ttl1" label="描述">
			</el-table-column>
			<el-table-column prop="download" label="下载次数(万次)">
			</el-table-column>
			<el-table-column prop="time" label="时间">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" :disabled="scope.row.vip=='管理者'?true:false">
						删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--分页器-->
		<div class="fenYe">
			<el-pagination 
				background 
				layout="prev, pager, next" 
				@current-change='currentChange' 
				:page-size='size' 
				:hide-on-single-page="true"
				:total="total">
			</el-pagination>
			<el-button size='mini' type="primary" @click="all">所有数据</el-button>
		</div>

		<!--弹出数据更新-->
		<my-box v-show='flag'>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position='right' label-width="2rem" class="demo-ruleForm">
				
				
				<el-form-item label="标题" prop="ttl">
					<el-input v-model="ruleForm.ttl"></el-input>
				</el-form-item>
				<el-form-item label="标题" prop="ttl1">
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
				<el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
				<el-button @click="resetForm('ruleForm')">取消</el-button>
				</el-form-item>
			</el-form>
		</my-box>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				name: ['标题'],
				val: ['ttl'],
				
				size: 6,
				current: 1,
				total: 0,
				music: [],
				souSuo: false,
				flag: false,

				_id: '',
				
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [],
				ruleForm: {
					ttl: '',
					ttl1: '',
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
						message: '请输入描述',
						trigger: 'blur'
					}],
					src: [{
						required: true,
						message: '请选择音乐',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {

			//搜索
			input(val) {
				this.souSuo = true
				this.getData(1, val)
			},

			//获取所有数据
			all() {
				this.souSuo = false
				this.getData(1)
			},

			//数据获取
			getData(current, obj = {}) {
				this.size = 6
				this.$http.get('/music', {
					params: {
						size: this.size,
						current: current,
						obj: JSON.stringify(obj)
					}
				}).then(res => {
					if(res.data.data) {
						res.data.data.map(i => {
							i.time = this.format(i.time)
						})
						this.total = res.data.total
						this.music = res.data.data
						if(this.souSuo){
							this.size = this.total
						}else{
							this.size = 6
						}
					}
				})

			},

			//分页器
			currentChange(index) {
				this.souSuo = false
				this.current = index
				this.getData(this.current)
			},
			
			//管理权限
			handleEdit(index, row) {
				this._id = row._id
				this.flag = !this.flag
				this.ruleForm = row
				this.fileList = row.src.map(i=>{
					let name = i.split('_')[1]
					let url = i
					return {name,url}
					})
			},

			//删除用户
			handleDelete(index, row) {
				console.log(row)
				this.$confirm('此操作将删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					console.log(row._id)
					this.$http.delete('/music?_id=' + row._id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});

						if(this.music.length === 1 && !this.souSuo) {
							this.getData(this.current - 1)
						}else if(this.souSuo){
							this.souSuo = false
							this.getData(1)
						} else {
							this.getData(this.current)
						}

					}, err => {
						this.$message({
							type: 'error',
							message: '删除失败!'
						});
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			
			//上传图片
			handleRemove(file, fileList) {
//      		this.$http.delete('/delImgZhuTi?name='+file.response).then(res=>{},err=>{})
        		this.ruleForm.src = fileList.map(i=>i.url)
      		},
       		addSrc(response, file, fileList){
       			console.log(fileList)
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
								message: '请选择1张图片!，文件名相同将会被替代'
							});
						}else{
							this.$http.put('/music',{_id:this._id,data: this.ruleForm}).then(res=>{
								this.$message({
								type: 'success',
								message: res.data
							});
							this.getData(this.current)
							this.fileList = []
							this.flag = !this.flag
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
				this.flag = !this.flag
			}

		},
		created() {
			this.getData(1)
		}
	}
</script>

<style scoped="scoped" lang="less">
	#music {
		/*overflow: hidden;*/
		width: 100%;
		height: 100%;
		.fenYe {
			width: 100%;
			padding-top: 1rem;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-around;
		}
		img{
			width: 3rem;
			padding: 0.2rem;
		}
		.demo-table-expand {
			font-size: 0;
		}
		
		
		.demo-table-expand .el-form-item {
			margin-right: 0;
			margin-bottom: 0;
			width: 100%;
		}
		
		.txt{
			text-indent: 2em;
		}
		.one{
			text-align: center;
		}
		
		.img{
			width: 3rem;
			height: 5rem;
		}
	}
</style>
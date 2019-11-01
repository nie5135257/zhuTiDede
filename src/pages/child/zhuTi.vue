<template>
	<div id="zhuTi">
		<my-sousuo :name='name' :val='val' @input='input'></my-sousuo>
		<el-table :data='zhuTi' :stripe='true' style="width: 100%" height='7.54rem'>
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-form label-position="left" inline class="demo-table-expand">
						<el-form-item label="商品名称:">
							<span>{{ props.row.ttl }}</span>
						</el-form-item>
						<el-form-item label="下载次数:">
							<span>{{ props.row.download }}万次</span>
						</el-form-item>
						<el-form-item label="商品价格:">
							<span>{{ props.row.price }}可币</span>
						</el-form-item>
						<el-form-item label="商品标签:">
							<!--<span ></span>-->
							<el-button type="primary" size='mini' v-for='(i,j) in props.row.label' :key='j'>{{ i }}</el-button>
						</el-form-item>
						<el-form-item>
							<div class="intro" v-for='(i,j) in props.row.intro' :key='j'>
								<p v-if='i'>资源简介({{j}}):</p>
								<p class="txt">{{ i }}</p>
							</div>
						</el-form-item>
						<el-form-item label="商品图片:">
							<img class='img' :src="i" alt="" v-for='(i,j) in props.row.src' :key='j'/>
						</el-form-item>
					</el-form>
				</template>
			</el-table-column>
			<el-table-column prop="ttl" label="标题">
			</el-table-column>
			<el-table-column prop="download" label="下载次数(万次)">
			</el-table-column>
			<el-table-column prop="price" label="价格(可币)">
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
				:hide-on-single-page="true"
				:page-size='size' 
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
						:action="$URL+'/uploadZhuTi'" 
						:on-remove="handleRemove" 
						:on-success = 'addSrc'
						multiple
						:file-list="fileList" 
						list-type="picture">
						<el-button size="small" type="primary">点击上传</el-button>
						<div slot="tip" class="el-upload__tip">
							请上传4张图片 （只能上传jpg/png文件，且不超过500kb,文件名相同会被替换）
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
				name: ['标题', '标签'],
				val: ['ttl', 'label'],
				
				size: 6,
				current: 1,
				total: 0,
				zhuTi: [],
				souSuo: false,
				flag: false,

				_id: '',
				
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
				this.$http.get('/zhuTi', {
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
						this.zhuTi = res.data.data
						this.total = res.data.total
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
				this.label = this.ruleForm.label
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
					this.$http.delete('/zhuTi?_id=' + row._id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});

						if(this.zhuTi.length === 1 && !this.souSuo) {
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
       			this.ruleForm.src.push(this.$URL+'/static/imgZhuTi/'+response)
       		},
        	

			//添加标签
			addLabel() {
				let res = this.label.some(i => i == this.addValue)
				if(!res) {
					this.label.push(this.addValue)
					this.addValue = ''
				} else {
					this.$message({
						type: 'error',
						message: this.addValue + '标签已存在!'
					});
					this.addValue = ''
				}
			},
			
			//数据提交
			submitForm(formName) {
				this.$refs[formName].validate(async(valid) => {
					if(valid) {
						console.log(this.fileList)
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
						
						if(this.ruleForm.src.length !== 4){
							this.$message({
								type: 'error',
								message: '请选择4张图片!，文件名相同将会被替代'
							});
						}else if(this.ruleForm.price){
							this.$http.put('/zhuTi',{_id:this._id,data: this.ruleForm}).then(res=>{
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
	#zhuTi {
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
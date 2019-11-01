<template>
	<div id="admin">
		<my-sousuo :name='name' :val='val' @input='input'></my-sousuo>
		<el-table :data='admin' :stripe='true' style="width: 100%">
			<el-table-column prop="adminName" label="账号">
			</el-table-column>
			<el-table-column prop="userName" label="姓名">
			</el-table-column>
			<el-table-column prop="address" label="地址">
			</el-table-column>
			<el-table-column prop="phone" label="电话">
			</el-table-column>
			<el-table-column prop="vip" label="开启权限">
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
				:page-size= 'size'
				:total="total">
			</el-pagination>
			<el-button size='mini' type="primary" @click="all">所有数据</el-button>
		</div>
			

		<!--弹出数据更新-->
		<my-box v-show='flag'>
			<el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-position='right' label-width="2rem" class="demo-ruleForm">
				<el-form-item label="权限管理" prop="vip">
					<el-select v-model="ruleForm.vip" placeholder="请选择开启权限" style='width: 100%;'>
						<el-option label="管理者" value="管理者"></el-option>
						<el-option label="管理员" value="管理员"></el-option>
						<el-option label="后台预览" value="后台预览"></el-option>
					</el-select>
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
				name: ['账号', '姓名', '手机'],
				val: ['adminName', 'userName', 'phone'],
				
				size: 5,
				current: 1,
				total: 0,
				admin: [],
				souSuo: false,
				flag: false,
				 

				_id: '',
				ruleForm: {
					vip: ''
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
					]
				}
			}
		},
		computed: {

		},
		methods: {
			
			//搜索
			input(val) {
				this.souSuo = true
				this.getData(1,val)
			},
			
			//获取所有数据
			all(){
				this.souSuo = false
				this.getData(1)
			},
			
			//数据获取
			getData(current,obj={}) {
				this.size = 6
				this.$http.get('admin', {
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
						this.admin = res.data.data
						if(this.souSuo){
							this.size = this.total
						}else{
							this.size = 6
						}
					}
				})

			},
			
			//分页器
			currentChange(index){
				this.souSuo = false
				this.current = index
				this.getData(this.current)
			},

			//管理权限
			handleEdit(index, row) {
				this._id = row._id
				this.flag = !this.flag
				this.ruleForm.vip = ''
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if(valid) {
						this.ruleForm._id = this._id

						if(this.ruleForm.vip === '管理者') {
							this.ruleForm.vip1 = 1
						} else if(this.ruleForm.vip === '管理员') {
							this.ruleForm.vip1 = 2
						} else {
							this.ruleForm.vip1 = 3
						}

						console.log(this.ruleForm)
						this.$http.put('/admin', this.ruleForm).then(res => {
							console.log(res.data)
							this.getData(this.current)
							this.flag = !this.flag
						})

					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.flag = !this.flag
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
					this.$http.delete('/admin?_id=' + row._id).then(res => {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						
						if(this.admin.length === 1 && !this.souSuo) {
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
			}

		},
		created() {
			this.getData(1)
		}
	}
</script>

<style scoped="scoped" lang="less">
	#admin {
		overflow: hidden;
		width: 100%;
		height: 100%;
		.fenYe{
			width: 100%;
			padding-top: 1rem;
			width: 100%;
			text-align: center;
			display: flex;
			justify-content: space-around;
			
		}
	}
</style>
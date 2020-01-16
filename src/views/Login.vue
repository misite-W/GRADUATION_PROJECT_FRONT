<template>
    <div style="background-color:black;">
        <vue-particles
                color="#5af"
                :particleOpacity="1"
                :particlesNumber="111"
                shapeType="circle"
                :particleSize="2"
                linesColor="#aaf"
                :linesWidth="1"
                :lineLinked="false"
                :lineOpacity="0.2"
                :linesDistance="150"
                :moveSpeed="1"
                :hoverEffect="false"
                hoverMode="grab"
                clickMode="push"
                class="lizi"

        >
        </vue-particles>
        <!--box-shadow: -10px 0px 10px #ccf; padding:50px;-->
        <!--style="width:500px; height: 500px"-->
        <div
        style="position: fixed;top:100px;left: 200px;
        box-shadow: -10px 0px 10px #ccf; padding:50px;
        z-index: 9999;width:500px; height: 500px">
            <h1>心 理 咨 询</h1>
            <p style="font-size: 24px;color: #5af;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >用 户 名</p>
            <el-input v-model="loginInfo.username" placeholder="Username" style="width: 340px;box-shadow: 0px 0px 20px #aaf; padding:5px;"/>
            <br>
            <p style="font-size: 24px; color: #5af;
                    text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >密   码</p>
            <el-input v-model="loginInfo.password" placeholder="Password" style="width: 340px ;box-shadow: 0px 0px 20px #aaf; padding:5px;"/>
            <br>
            <br>
            <el-button @click="test" style="background-color: #000 ;color: #5af;box-shadow: 0px 0px 20px #aaf; padding:5px; width: 80px;height: 40px;
                    text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;
            ">登 录 </el-button>

            <el-button @click="register" style="background-color: #000;color: #5af;box-shadow: 0px 0px 20px #aaf; padding:5px;width: 80px;height: 40px;
                    text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;
            ">注 册</el-button>
            <el-dialog
                    title="用户注册"
                    :visible.sync="dialogVisible"
                    width="30%"
                    style="box-shadow: -10px 0px 10px #ccf; padding:50px;"

            >

                <!--:before-close="handleClose"-->
                <div style="height: 400px;">
                    <el-form  :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
                        <el-form-item label="用户名" prop="userName">
                            <el-input type="text" v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="pass">
                            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="checkPass">
                            <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input v-model="ruleForm.age"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <span slot="footer" class="dialog-footer">
                    <br>
                    <br>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            var checkuserName = (rule,value,callback) =>{
                if (!value){
                    return callback(new Error('用户名不能为空'));
                }
            }
            var checkAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('年龄不能为空'));
                }
                setTimeout(() => {
                    if (isNaN(value)) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value < 18) {
                            callback(new Error('必须年满18岁'));
                        } else {
                            callback();
                        }
                    }
                }, 1000);
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.ruleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                flag:'',
                loginInfo:{
                  username:'',
                  password:''
                },
                dialogVisible: false,
                ruleForm: {
                    userName:'',
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules: {
                    userName:[
                        { validator:checkuserName,trigger:'blur'}
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ],
                    age: [
                        { validator: checkAge, trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
            test(){
                var _vm = this;
                // console.log("this," ,this)
                // this.$axios({
                //     method: "post",
                //     url : '/test',
                //     data: {}
                // })
                this.$axios.post("/login",this.loginInfo)
                            .then(res=>{
                        _vm.flag=res.data["flag"];
                        if (res.data["login"] == "yes"){
                            console.log("登陆成功")
                            sessionStorage.setItem("token", 'true');
                            _vm.$router.push({path: "/index"});
                        } else {
                            console.log("登录失败")
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            register(){
                this.$router.push('/register')
            },
            login(){
                this.$router.push('/index')
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('submit!');
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

<style scoped>
    h1 {
        font-family: "微软雅黑 Light";
        font-size: 40px;
        font-weight: 900;
        color: #5af;
        padding-top: 100px;
        position: relative;
        top: -50px;
        text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;

    }
</style>
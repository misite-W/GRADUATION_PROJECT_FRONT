<template>
    <div style="background-color:black;">
        <vue-particles
                color="#a5f"
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
                :clickEffect="flase"
                clickMode="push"
                class="lizi"

        >
        </vue-particles>
        <div style="position: fixed;top:30px;left: 200px;
            box-shadow: -10px 0px 10px #a5f; padding:50px;
            z-index: 9999;width:500px; height: 570px">
            <span class="title">用户注册</span>
            <br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >用户名</span>
            <el-input v-model="userInfo.username" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >密  码 </span>
            <el-input v-model="userInfo.password" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >确认密码 </span>
            <el-input v-model="repassword" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >真实姓名</span>
            <el-input v-model="userInfo.name" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >年龄 </span>
            <el-input v-model="userInfo.age" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >性别 </span>
            <el-input v-model="userInfo.sex" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <span style="display:inline-block; width:90px ;font-size: 18px;color: #a5f;
            text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;"
            >电话 </span>
            <el-input v-model="userInfo.phone" style="box-shadow: -0px 0px 20px #a5f; padding:5px; width: 200px" placeholder="请输入内容" />
            <br><br>
            <el-button @click="register" style="background-color: #000;color: #a5f;box-shadow: 0px 0px 20px #aaf; padding:5px;width: 80px;height: 40px;
                    text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #a5f,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;
            ">注册</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data:function(){
            return{
                userInfo:{
                    flag:'0',
                    username:'',
                    password:'',
                    name:'',
                    age:'',
                    sex:'',
                    phone:''
                },
                repassword:'',
            }
        },
        methods:{
            register(){
                if (this.userInfo.username=='' || this.userInfo.username.length>10 || this.userInfo.username.length <6){
                    alert("用户名不合规范")
                }
                else if(this.userInfo.password=='' || this.userInfo.username.length>10 || this.userInfo.username.length <6){
                    alert("密码不合规范")
                }
                else if(this.repassword==''||this.userInfo.password != this.repassword){
                    alert("确认密码为空或两次密码输入不一致")
                }
                else if(this.userInfo.name == ''){
                    alert("真实姓名不能为空")
                }
                else if(this.userInfo.sex == ''){
                    alert("性别不能为空")
                }
                else if(this.userInfo.phone == '' || this.userInfo.phone.length != 11){
                    alert("联系电话不合规范")
                }
                else{
                    this.$axios.post("/register", this.userInfo)
                        .then(res => {
                            console.log(res)
                            if(res.data===0){
                                alert("恭喜你，注册成功！")
                                this.$router.push('/login')
                            }
                            else {
                                alert("用户名已存在")
                            }
                        })
                        .catch(err => {
                            console.log(err)
                        })
                }
            }
        }
    }
</script>

<style scoped>
    .title {
        font-family: "微软雅黑 Light";
        font-size: 40px;
        font-weight: 900;
        color: #a5f;
        padding-top: 100px;
        position: relative;
        top: -30px;
        text-shadow: .2rem 100rem .5rem #aaf,-.2rem 100rem .5rem #aaf,0rem .2rem .5rem #aaf,0rem -.2rem .5rem #aaf;
    }
</style>
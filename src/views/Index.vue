<template>
    <div class="block" style="background-color: #E8E8FF">
        <div style="background-color: #fff;width: 100%;height: 50px;background-color: black">
        </div>
        <span style="font-size:70px; font-weight: bolder; font-family:'微软雅黑 Light';
        display: inline-block;
        position: relative;
        left: 470px;
        top:50px;
        ">大学生心理咨询网站</span>
        <!--<el-menu  background-color="#000"-->
                  <!--text-color="#fff"-->
                  <!--active-text-color="#ffd04b"-->
                   <!--class="el-menu-demo" mode="horizontal" >-->
        <!--<el-menu-item index="1">处理中心</el-menu-item>-->
        <!--<el-submenu index="2">-->
            <!--<template slot="title">我的工作台</template>-->
            <!--<el-menu-item index="2-1">选项1</el-menu-item>-->
            <!--<el-menu-item index="2-2">选项2</el-menu-item>-->
            <!--<el-menu-item index="2-3"></el-menu-item>-->
        <!--</el-submenu>-->
        <!--<el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>-->
        <!--</el-menu>-->
        <el-carousel  style="position: relative;  top:100px; width: 100%; " :interval="3000" arrow="always" class="d_jump" height="500px">
            <el-carousel-item  v-for="item in imgList" :key="item.id">
                <el-row>
                    <el-col :span="24"><img style="; width: 100% ; align-content: center" ref="imgHeight" :src="item.idView" class="banner_img "/></el-col>
                </el-row>
            </el-carousel-item>
        </el-carousel>
        <el-row>
                <el-card style="display:inline-block;position:relative; margin-left: 200px; margin-top: 200px;width: 300px" :body-style="{ padding: '10px' }">
                        <img src="../assets/image/knowledge.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>心理知识</span>
                            <div class="bottom clearfix">
                                <el-button type="text" @click="knowledge" class="button">心理知识</el-button>
                            </div>
                        </div>
                </el-card>

                <el-card style="display:inline-block;position:relative; margin-left: 80px; margin-top:200px ; width: 300px" :body-style="{ padding: '10px' }">
                        <img src="../assets/image/news.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>心理新闻</span>
                            <div class="bottom clearfix">
                                <el-button type="text" @click="news" class="button">心理新闻</el-button>
                            </div>
                        </div>
                </el-card>
                <el-card style="display:inline-block; margin-left:80px; width: 300px" :body-style="{ padding: '10px' }">
                        <img src="../assets/image/forum.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>心理论坛</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button" @click="forum">心理论坛</el-button>
                            </div>
                        </div>
                </el-card>
                <el-card style="display:inline-block; margin-left:400px;margin-top: 100px; width: 300px" :body-style="{ padding: '10px' }">
                        <img src="../assets/image/test.jpg" class="image">
                        <div style="padding: 14px;">
                            <span>心理测试</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">心理测试</el-button>
                            </div>
                        </div>
                </el-card>
                <el-card style="display:inline-block; margin-left:80px; width: 300px" :body-style="{ padding: '10px' }">
                        <img src="../assets/image/appointment.jpg" class="image">
                        <div style="padding: 14px;">
                                <span>专家预约</span>
                            <div class="bottom clearfix">
                                <el-button type="text" class="button">专家预约</el-button>
                            </div>
                        </div>
                </el-card>
        </el-row>
        <div style="background-color: #fff;width: 100%;height: 50px;position: relative ;bottom: 460px; background-color: black">
        </div>
        <div style="background-color: #fff;width: 100%;height: 70px;position: relative ; background-color: black">
        </div>
    </div>
</template>
<script>
    export default {
        name: "Index",
        data(){
            return{
                currentDate: new Date(),
                imgList: [
                    {id: 0, idView: require('../assets/image/u=1171922572,2103486147&fm=26&gp=0.jpg')},
                    {id: 1, idView: require('../assets/image/u=1756386140,216778897&fm=26&gp=0.jpg')},
                ]
            }
        },
        created(){
            this.isLogin
            // console.log(sessionStorage.getItem("token"))

        },
        methods:{
            isLogin(){
                if(this.$session.get("key").length === 0){
                    this.$router.push('/login')
                }
            },
            test(){
                this.$router.push('/index/test')
            },
            forum(){
                this.$router.push('/index/forum')
            },
            knowledge(){
                this.$router.push('/index/knowledge')
            },
            news(){
                this.$router.push('/index/news')
            },
            forum(){
                this.$router.push('/index/forum')
            },
            appointment(){
                this.$router.push('/index/appointment')
            },
            specialist(){
                this.$router.push('/index/specialist')
            },
            register(){
                this.$router.push('/index/register')
            },
            quit(){
                this.$router.push('')
            }

        },
    }
</script>

<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        font-size: 14px;
        opacity: 0.75;
        line-height: 150px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
    .time {
        font-size: 13px;
        color: #999;
    }

    .bottom {
        margin-top: 13px;
        line-height: 12px;
    }

    .button {
        padding: 0;
        float: right;
    }

    .image {
        width: 100%;
        display: block;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }
</style>
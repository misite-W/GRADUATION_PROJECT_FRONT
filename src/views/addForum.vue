<template>
    <div style="position: relative; left: 100px;top:70px">
        <h1>标题</h1>
        <el-input v-model="info.forum_title" style="width: 30%" placeholder="请输入标题"></el-input>
        <h1>内容</h1>
        <el-input v-model="info.forum_content" style="width: 50% ;" placeholder="请输入内容" type="textarea" ></el-input>
        <br>
        <br>
        <br>
        <el-button class="el-button--success" @click="submit">提交</el-button>
        <el-button class="el-button--success" @click="revert">返回</el-button>
    </div>
</template>

<script>
    export default {
        name: "addForum",
        data(){
                return{
                    info:{
                        forum_title:'',
                        forum_content:''
                    }
                }
        },
        methods:{
            submit(){
                this.$axios.post('/saveForum',this.info)
                    .then(res=>{
                        alert("恭喜你，提交成功!")
                    })
                    .catch(err=>{
                        alert("抱歉，提交失败！")
                    })
            },
            revert(){
                this.$router.push('/index/forum')
            }
        }
    }
</script>

<style scoped>

</style>
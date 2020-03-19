<template>
    <div style="position: relative; top:50px; left: 70px;">
        <div >
            <h1 style="display: inline-block">心理论坛</h1>
            <div style="display: inline-block;position:relative; left: 700px;">
                <h2 style="display: inline-block" >搜索：</h2>
                <el-input v-model="queryTitle" style="display: inline-block;width: 50%"></el-input>
                <el-button class="el-button--success" @click="queryForum(queryTitle)">搜索</el-button>
            </div>
            <el-button class="el-button--success" style="position: relative ; left:800px" @click="revert">返回</el-button>
            <el-button class="el-button--success" style="position: relative; left: 600px" @click="add">添加</el-button>

        </div>
        <el-divider></el-divider>
        <el-table
                ref="multipleTable"
                :data="forum"
                tooltip-effect="dark"
                style="width: 90%"
               >
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="forum_id"
                    label="ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="forum_title"
                    label="TITLE"
                    width="180">
            </el-table-column>
            <!--<el-table-column-->
                    <!--prop="updateTime"-->
                    <!--label="UPDATETIME">-->
            <!--</el-table-column>-->
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="forumDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="deleteForum(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

    export default {
        name: "forum",
        data(){
            return{
                forum:[],
                queryTitle:''
            }
        },
        methods:{
            forumDetail(row){
                this.$router.push({path:'/index/forum/forumDetail',query:{row:row}});
            },
            deleteForum(row){
                var that = this;
                var id = row.id;
                console.log(id)
                this.$axios.post("/deleteForum",{id:id})
                    .then(res=>{
                        window.location.reload()
                    })
                    .catch(err=>{

                    })
            },
            revert(){
                this.$router.push("/index")
            },
            add(){
                this.$router.push("/index/forum/addForum")
            },
            queryForum(queryTitle){
                let that = this;
                this.$axios.post('/queryForum',queryTitle)
                    .then(res=>{
                        that.forum.push(...res.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        },
        created() {
            let that=this;
            this.$axios.post('/getForum')
                .then(res=>{
                    that.forum.push(...res.data)
                })
                .catch(err=>{
                    console.log(err)
                })

        }
    }

</script>

<style scoped>

</style>
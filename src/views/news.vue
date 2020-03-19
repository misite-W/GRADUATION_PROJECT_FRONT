<template>
    <div style="position: relative; top:50px; left: 100px;" >
        <span style="font-size: 36px">心里新闻</span>
        <el-button class="el-button--success" style="position: relative ; left:1130px;" @click="revert">返回</el-button>
        <el-button class="el-button--success" style="position: relative; left: 950px" @click="add">添加</el-button>
        <el-divider></el-divider>
            <el-table
                    ref="multipleTable"
                    :data="news"
                    tooltip-effect="dark"
                    style="width: 90%"
                    @selection-change="handleSelectionChange">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="ID"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="title"
                        label="TITLE"
                        width="180">
                </el-table-column>
                <el-table-column
                        :show-overflow-tooltip="true"
                        prop="content"
                        label="CONTENT">
                </el-table-column>
                <el-table-column
                        prop="updateTime"
                        label="UPDATETIME">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button @click="newsDetail(scope.row)" type="text" size="small">查看</el-button>
                            <el-button @click="deleteNews(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
    </div>
</template>

<script>
    export default {
        name: "news",
       data(){
           return{
               news:[],
             }
       },
        methods:{
            newsDetail(row){
                this.$router.push({path:'/index/news/newsDetail',query:{row:row}});
            },
            onload(){
                let that = this;
                this.$axios.post('/getNews')
                    .then(res=>{
                        that.news.push(...res.data)
                        console.log(this.news)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            deleteNews(row){
                var that = this;
                var id = row.id;
                console.log(id)
                this.$axios.post("/deleteNews",{id:id})
                    .then(res=>{
                       window.location.reload()
                    })
                    .catch(err=>{

                    })
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            revert(){
                this.$router.push("/index")
            },
            add(){
                this.$router.push("/index/news/addNews")
            }
        },
        created() {
           this.onload();
        }
    }
</script>

<style scoped>
    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 480px;
    }
</style>
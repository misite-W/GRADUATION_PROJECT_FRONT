<template>
    <div  style="position: relative; top:50px; left: 70px;">
        <div>
            <h1 style="display: inline-block">心理知识</h1>
            <el-button class="el-button--success" style="position: relative ; left:1130px;" @click="revert">返回</el-button>
            <el-button class="el-button--success" style="position: relative; left: 950px" @click="add">添加</el-button>
        </div>
        <el-divider></el-divider>
        <el-table
                ref="multipleTable"
                :data="knowledge"
                tooltip-effect="dark"
                style="width: 90%"
               >
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
                    <el-button @click="knowledgeDetail(scope.row)" type="text" size="small">查看</el-button>
                    <el-button @click="deleteKnowledge(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "knowledge",
        data(){
            return{
                knowledge:[],
            }
        },
        methods:{
            knowledgeDetail(row){
                this.$router.push({path:'/index/knowledge/knowledgeDetail',query:{row:row}});
            },
            deleteKnowledge(row){
                this.$axios.post("/deleteKnowledge",{id:row.id})
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
                this.$router.push("/index/knowledge/addKnowledge")
            }
        },
        created() {
            let that = this;
            this.$axios.post('/getKnowledge')
                .then(res=>{
                    that.knowledge.push(...res.data)
                    console.log(this.news)
                })
                .catch(err=>{
                    console.log(err)
                })
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
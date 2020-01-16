<template>
    <div  >

            <el-table
                    ref="multipleTable"
                    :data="news"
                    tooltip-effect="dark"
                    style="width: 100%"
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
                        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                        <el-button type="text" size="small">编辑</el-button>
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
            handleClick(row) {
                console.log(row);
            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
        created() {
            let that = this;
            this.$axios.post('/getNews')
                .then(res=>{
                       that.news.push(...res.data)
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
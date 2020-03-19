<template>
    <div style="position:relative ;left:70px">
        <div>
            <div style="display: block; position:relative; left: 50px;top: 100px">
                <div>
                    <h2 style="display: inline-block">
                        {{knowledge.title}}
                    </h2>
                    <el-button style="position:relative ;left: 900px;" class="el-button--success" @click="revert">返回</el-button>
                </div>
                <el-divider/>
                {{knowledge.content}}
                <br>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "knowledgeDetail",
        data(){
            return{
                knowledge:this.$route.query.row
            }
        },
        methods:{
            revert(){
                this.$router.push('/index/knowledge')
            }
        }
    }
</script>

<style scoped>

</style>
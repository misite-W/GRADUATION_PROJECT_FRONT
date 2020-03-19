<template>
    <div>
        <div style="display: block; position:relative; left: 50px;top: 100px">
            <h2>
                {{news.title}}
            </h2>
            <el-divider/>
                {{news.content}}
            <br>
            <br>
        </div>
    </div>
</template>

<script>
    export default {
        name: "newsDeatil",
        data(){
            return{
                news:
                   this.$route.query.row
            }
        },
        // created() {
        //     let that = this;
        //     this.$axios.post('/getNews')
        //         .then(res=>{
        //             that.news.push(...res.data)
        //             console.log(this.news)
        //         })
        //         .catch(err=>{
        //             console.log(err)
        //         })
        // }
    }
</script>

<style scoped>

</style>
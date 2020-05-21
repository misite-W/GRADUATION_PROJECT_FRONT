<template>
    <div style="position:relative; background-color: white;margin-bottom: 100px">
    <div style="position:relative; left: 50px;top: 50px;width: 1200px;" >
        <div>
            <div >
                <div>
                    <hr height='500'  bgcolor='red'></hr>

                    <h2 style="display: inline-block">
                        {{forum.forum_title}}
                    </h2>
                    <el-button style="position:relative ;left: 900px;" type="primary" @click="revert">返回</el-button>
                </div>
                <el-divider>心理论坛</el-divider>
                <img :src="icon" width="1200px" height="400px">
                <span style="letter-spacing:0.4em;text-indent: 0.5em;display: inline-block">{{forum.forum_content}}</span>
                <br>
                <br>
                <el-divider>以下是评论</el-divider>
            </div>
        </div>
        <div>
            <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
                <div class="reply-info" >
                    <div
                            tabindex="0"
                            contenteditable="true"
                            id="replyInput"
                            spellcheck="false"
                            placeholder="输入评论..."
                            class="reply-input"
                            @focus="showReplyBtn"
                            @input="onDivInput($event)"
                            v-model="this.replyComment"
                    >
                    </div>
                </div>
                <div class="reply-btn-box" v-show="btnShow">
                    <el-button class="reply-btn" size="medium" @click="sendComment" type="primary">发表评论</el-button>
                </div>
            </div>
            <div v-for="(item,i) in comments" :key="i" class="author-title reply-father">
                <el-divider>{{i+1}}楼</el-divider>
                <div class="talk-box">
                <div class="author-info" >
                    <span class="author-name">{{item.commentUserName}}</span>
                    <span class="author-time">{{item.time}}</span>
                </div>
                </div>
                    <p style="position:relative; left: 100px;">
                        <span class="reply">{{item.commentContent}}</span>
                    </p>
                        <div class="reply-box">
                            <div v-for="item1 in item.replyList" :key = "" style="position:relative; left: 200px;width: 1000px">
                            <div class="author-info">
                                <span class="author-name">{{item1.userName}}</span>
                                <span class="author-time">{{item1.time}}</span>
                            </div>
                            <p style="position:relative; left: 100px;">
                                <span class="reply">{{item1.replyContent}}</span>
                            </p>
                            </div>
                        </div>
                    <el-button  @click="showReplyInput(i,item.commentId)" style="position:relative;left: 800px" type="text" size="small">回复</el-button>
                <div  v-show="_inputShow(i)" class="my-reply my-comment-reply">
                    <div class="reply-info" >
                        <div
                                tabindex="0"
                                contenteditable="true"
                                id="replyInput1"
                                spellcheck="false"
                                placeholder="输入评论..."
                                class="reply-input"
                                @focus="showReplyBtn"
                                @input="onDivInput($event)">
                        </div>
                    </div>
                    <div class=" reply-btn-box">
                        <el-button class="reply-btn" size="medium" @click="sendCommentReply" type="primary">发表评论</el-button>
                    </div>
                </div>
            </div>
        </div>
        <el-divider>我是有底线的</el-divider>
    </div>

    </div>
</template>

<script>
    const clickoutside = {
        // 初始化指令
        bind(el, binding, vnode) {
            function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
            }
            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.vueClickOutside = documentHandler;
            document.addEventListener('click', documentHandler);
        },
        update() {},
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener('click', el.vueClickOutside);
            delete el.vueClickOutside;
        },
    };
    export default {
        name: "forumDetail",
        inject:['reload'],
        data(){
            return{
                icon:this.$route.query.row.base64,
                reply:{},
                btnShow:false,
                btnShow1:false,
                index:'0',
                replyComment:'',
                commentId:'',
                comments:[],
                forum:this.$route.query.row,
                myHeader:'https://ae01.alicdn.com/kf/Hd60a3f7c06fd47ae85624badd32ce54dv.jpg',

            }
        },
        directives: {clickoutside},
        methods:{
            changeInputShow(i){
                this.comments[i].inputShow = true;
            },
            inputFocus(){
                var replyInput = document.getElementById('replyInput');
                replyInput.style.padding= "8px 8px"
                replyInput.style.border ="2px solid blue"
                replyInput.focus()
            },
            showReplyBtn(){
                this.btnShow = true
            },
            hideReplyBtn(){
                this.btnShow = false
                replyInput.style.padding= "10px"
                replyInput.style.border ="none"
            },
            sendCommentReply(){
                if(!this.replyComment){
                    this.$message({
                        showClose: true,
                        type:'warning',
                        message:'评论不能为空'
                    })
                }else{
                    let reply ={}
                    reply.replyContent=this.replyComment
                    reply.commentId = this.commentId
                    this.$axios.post("/saveReply",reply)
                        .then(res=>{
                            this.reload()
                        })
                        .catch(err=>{

                        })
                    this.replyComment = ''
                    this.commentId = ''
                }
            },
            sendComment(){
                if(!this.replyComment){
                    this.$message({
                        showClose: true,
                        type:'warning',
                        message:'评论不能为空'
                    })
                }else{
                    let comment ={}
                    let timeNow = new Date().getTime();
                    let time= this.dateStr(timeNow);
                    comment.commentContent=this.replyComment
                    comment.commentForumId = this.forum.id
                    // a.comment_content =this.replyComment
                    // a.headImg = this.myHeader
                    // a.time = time
                    // a.like = 0
                    this.$axios.post("/saveComment",comment)
                        .then(res=>{
                           this.comments = []
                            this.getComment()
                        })
                        .catch(err=>{

                        })
                    // a.commentNum = 0
                    // this.comments.push(comment),
                    this.replyComment = '',
                    input.innerHTML = '';
                }
            },
            showReplyInput(i,commentId){
                this.comments[this.index].inputShow = false
                this.index =i
                this.comments[i].inputShow = true
                this.commentId = commentId
            },
            _inputShow(i){
                return this.comments[i].inputShow
            },
            onDivInput: function(e) {
                this.replyComment = e.target.innerHTML;
            },
            dateStr(date){
                //获取js 时间戳
                var time=new Date().getTime();
                //去掉 js 时间戳后三位，与php 时间戳保持一致
                time=parseInt((time-date)/1000);
                //存储转换值
                var s;
                if(time<60*10){//十分钟内
                        return '刚刚';
                    }else if((time<60*60)&&(time>=60*10)){
                        //超过十分钟少于1小时
                        s = Math.floor(time/60);
                        return  s+"分钟前";
                    }else if((time<60*60*24)&&(time>=60*60)){
                        //超过1小时少于24小时
                        s = Math.floor(time/60/60);
                        return  s+"小时前";
                    }else if((time<60*60*24*30)&&(time>=60*60*24)){
                        //超过1天少于30天内
                        s = Math.floor(time/60/60/24);
                        return s+"天前";
                }else{
                    //超过30天ddd
                    var date= new Date(parseInt(date));
                    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
                }
            },
            revert(){
                this.$router.push('/index/forum')
            },
            getComment(){
                this.$axios.post("/getComments",{forumId:this.forum.id})
                    .then(res=>{
                        console.log(res.data)
                        this.comments.push(...res.data)
                    })
                    .catch(err=>{

                    })
            },


        },
        created(){
            this.getComment()
        }
    }
</script>

<style lang="stylus" scoped>
    .my-reply
        padding 10px
        background-color #fafbfc
        .header-img
            display inline-block
            vertical-align top
        .reply-info
            display inline-block
            margin-left 5px
            width 100%
            @media screen and (max-width:1200px) {
                width 80%
            }
            .reply-input
                min-height 20px
                line-height 22px
                padding 10px 10px
                color #ccc
                background-color #fff
                border-radius 5px
                &:empty:before
                    content attr(placeholder)
                &:focus:before
                    content none
                &:focus
                    padding 8px 8px
                    border 2px solid blue
                    box-shadow none
                    outline none
        .reply-btn-box
            height 25px
            margin 10px 0
            .reply-btn
                position relative
                float right
                margin-right 15px
    .my-comment-reply
        margin-left 50px
        .reply-input
            width flex
    .author-title:not(:last-child)
        border-bottom: 1px solid rgba(178,186,194,.3)
    .author-title
        padding 10px
        .header-img
            display inline-block
            vertical-align top
        .author-info
            display inline-block
            margin-left 5px
            width 100px
            height 40px
            line-height 20px
            >span
                display block
                cursor pointer
                overflow hidden
                white-space nowrap
                text-overflow ellipsis
            .author-name
                color #000
                font-size 18px
                font-weight bold
            .author-time
                font-size 14px
        .icon-btn
            width 30%
            padding 0 !important
            float right
            @media screen and (max-width : 1200px){
                width 20%
                padding 7px
            }
            >span
                cursor pointer
            .iconfont
                margin 0 5px
        .talk-box
            margin 0 50px
            >p
                margin 0
            .reply
                font-size 16px
                color #000
        .reply-box
            margin 10px 0 0 50px
            background-color #efefef
</style>
<template>
    <div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="昵称">
                <el-input
                        type="text"
                        placeholder="昵称"
                        v-model="form.name"
                        maxlength="30"
                        show-word-limit
                ></el-input>
            </el-form-item>
            <el-form-item label="留言">
                <el-input
                        type="textarea"
                        placeholder="给我留言吧"
                        v-model="form.content"
                        maxlength="150"
                        show-word-limit
                >
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">发送</el-button>
            </el-form-item>
        </el-form>
        <el-card shadow="hover" v-loading="loading">
        <article v-for="(item, index) in shows" :key="index" class="media">
            <div class="media-content">
                <div class="">
                    <p class="ellipsis is-ellipsis-1">
                    <div>
                    <h1>{{item.name}}:</h1><br>
                        <span class="is-size-6">{{ item.content }}</span>
                    </div>
                    </p>
                </div>
            </div>
            <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                <div class="level-left">
                    <div class="level-left">
                        <span class="mr-1">
                        发布于:{{ dayjs(item.time).format("YYYY/MM/DD HH:mm:ss") }}
                      </span>
                    </div>
                </div>
            </nav>
            <div class="media-right" />
        </article>
        </el-card>
        <div class="page-bar" style="margin: 0 auto">
            <ul>
                <li v-if="cur>1"><a v-on:click="cur--">上一页</a></li>
                <li v-if="cur==1"><a class="banclick">上一页</a></li>
                <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
                    <a v-on:click="btnClick(index)">{{ index }}</a>
                </li>
                <li v-if="cur!=all"><a v-on:click="cur++">下一页</a></li>
                <li v-if="cur == all"><a class="banclick">下一页</a></li>
                <li><a>共<i>{{ all }}</i>页</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    import {getAllComment,createComment} from "../../api/comment";
    export default {
        name: "commentPage",
        data(){
            return{
                comment:[],
                form:{
                    name:'',
                    content:'',
                },
                cur: 1,
                totalPage: 10,
                loading:true
            }
        },
        created() {
            this.fetchAllComment();
        },
        methods:{
            async fetchAllComment(){
                getAllComment().then(value=>{
                    this.comment=value.data;
                    this.comment.reverse();
                    this.loading=false;
                })
            },
            async onSubmit(){
                createComment(this.form).then(value=>{
                    this.fetchAllComment();
                })
            },
            btnClick: function (data) {//页码点击事件
                if (data != this.cur) {
                    this.cur = data
                }
            },
        },
        computed:{
            shows: function () {
                return this.comment.slice((this.cur - 1) * this.totalPage, this.cur * this.totalPage)
            },
            all: function () {
                return Math.ceil(this.comment.length / this.totalPage)
                // return 10
            },
            indexs: function () {
                var left = 1;
                var right = this.all;
                var ar = [];
                if (this.all >= 5) {
                    if (this.cur > 3 && this.cur < this.all - 2) {
                        left = this.cur - 2
                        right = this.cur + 2
                    } else {
                        if (this.cur <= 3) {
                            left = 1
                            right = 5
                        } else {
                            right = this.all
                            left = this.all - 4
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left)
                    left++
                }
                return ar
            }
        }
    }
</script>

<style scoped>
    /*分页*/
    .page-bar{
        margin:40px auto;
        margin-top: 150px;

    }
    ul,li{
        margin: 0px;
        padding: 0px;
    }
    li{
        list-style: none
    }
    .page-bar li:first-child>a {
        margin-left: 0px
    }
    .page-bar a{
        border: 1px solid #ddd;
        text-decoration: none;
        position: relative;
        float: left;
        padding: 6px 12px;
        margin-left: -1px;
        line-height: 1.42857143;
        color: #5D6062;
        cursor: pointer;
        margin-right: 20px;
    }
    .page-bar a:hover{
        background-color: #eee;
    }
    .page-bar a.banclick{
        cursor:not-allowed;
    }
    .page-bar .active a{
        color: #fff;
        cursor: default;
        background-color: CornflowerBlue ;
        border-color: CornflowerBlue ;
    }
    .page-bar i{
        font-style:normal;
        color: CornflowerBlue ;
        margin: 0px 4px;
        font-size: 12px;
    }

</style>
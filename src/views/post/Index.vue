<template>
    <div>
        <el-card shadow="hover" v-loading="loading">
                <article v-for="(item, index) in shows" :key="index" class="media">
                    <div class="media-content">
                        <div class="">
                            <p class="ellipsis is-ellipsis-1">
                                <div>
                                    <router-link :to="{name:'post-detail',params:{id:item.articleId}}">
                                        <span class="is-size-6">{{ item.articleTitle }}</span>
                                    </router-link>
                                 </div>
                            </p>
                        </div>
                    </div>
                        <nav class="level has-text-grey is-mobile  is-size-7 mt-2">
                            <div class="level-left">
                                <div class="level-left">
<!--                                    <router-link class="level-item" :to="{ path: `/member/${item.username}/home` }">-->
<!--                                        {{ item.alias }}-->
<!--                                    </router-link>-->
                                    <span class="mr-1">
                        发布于:{{ dayjs(item.articleCreateTime).format("YYYY/MM/DD") }}
                      </span>

                                </div>
                            </div>
                        </nav>
                    <div class="media-right" />
                </article>
            <div class="page-bar" style="margin: 0 auto;text-align: center">
                <ul>
                    <li v-if="cur>1"><a v-on:click="cur--,pageClick()">上一页</a></li>
                    <li v-if="cur==1"><a class="banclick">上一页</a></li>
                    <li v-for="index in indexs" v-bind:class="{ 'active': cur == index}">
                        <a v-on:click="btnClick(index)">{{ index }}</a>
                    </li>
                    <li v-if="cur!=all"><a v-on:click="cur++">下一页</a></li>
                    <li v-if="cur == all"><a class="banclick">下一页</a></li>
                    <li><a>共<i>{{ all }}</i>页</a></li>
                </ul>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {getAllArticle} from "../../api/article";

    export default {
        name: "ArticleList",
        data(){
            return{
                articleList:[],
                cur: 1,
                totalPage: 15,
                loading:true
            }
        },
        created() {
            this.fetchArticleList();
        }
        ,
        methods:{
            fetchArticleList(){
                getAllArticle().then(data=>{
                    this.articleList=data.data.reverse();
                    this.loading=false;
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
                return this.articleList.slice((this.cur - 1) * this.totalPage, this.cur * this.totalPage)
            },
            all: function () {
                return Math.ceil(this.articleList.length / this.totalPage)
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
<template>
    <div>
        <div>
            <router-link to="/admin/article_create">新建文章</router-link>
            <table border="1">
            <tr v-for="it in article">

                <td>{{it.articleTitle}}</td>
                <td><router-link
                        :to="{
                            name:'admin_article_edit',
                            query:{
                                id:it.articleId
                            }
                        }"
                >编辑</router-link></td>
                <td><span @click="delete_article(it.articleId)">删除</span></td>
            </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import {getAllArticle,deleteArticle} from "../../../api/article";

    export default {
        name: "ArticleList",
        data(){
            return{
                article:{},
                myDate:'',

            }
        },
        created() {
            this.fetchArticle()
        }
        ,
        methods:{
            async fetchArticle(){
                getAllArticle().then((value)=>{
                    const data=value.data;
                    var tmp=this.dayjs(data[0].articleCreateTime).format('YYYY-MM-DD HH:mm:ss');
                    console.log(tmp);
                    this.myDate=tmp;
                    this.article=data;
                })
            },
            async delete_article(id){
                // alert(id);
                var tmp={};
                tmp['id']=id;
                deleteArticle(tmp).then((value)=>{
                    this.fetchArticle()
                })
            }
        }
    }
</script>

<style>
</style>
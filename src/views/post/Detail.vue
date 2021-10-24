<template>
    <div>
        <!--文章详情-->
<!--        <div class="column is-three-quarters">-->
            <!--主题-->
            <el-card
                    class="box-card"
                    shadow="never"
                    v-loading="loading"
            >
                <div
                        slot="header"
                        class="has-text-centered"
                >
                    <p class="is-size-5 has-text-weight-bold">{{ articleTitle }}</p>
                    <div class="has-text-grey is-size-7 mt-3">
                        创建时间：<span>{{ dayjs(createTime).format('YYYY-MM-DD HH:mm:ss') }}</span><br>
                        更新时间：<span>{{ dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
<!--                        <el-divider direction="vertical" />-->
                    </div>
                </div>
                <div class="columns">
                    <div class="column is-three-quarters">
                        <div id="preview" />
                    </div>
                    <div class="column">
                        <div id="outline" style="position: fixed;overflow: scroll;height: 500px"/>
                    </div>
                </div>
                <!--Markdown-->


                <!--标签-->
            </el-card>
        </div>
</template>

<script>
    import {getArticleById } from "../../api/article";
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    export default {
        name: 'ArticleDetail',
        computed: {
        },
        data() {
            return {
                flag: false,
                articleContent: '',
                articleId: this.$route.params.id,
                articleTitle:'',
                createTime:'',
                updateTime:'',
                loading:true
            }
        },
        mounted() {
            this.fetchArticle();
            // this.loading=false;
        },
        methods: {
            renderMarkdown(md) {
                const previewElement=document.getElementById('preview');
                const outlineElement=document.getElementById('outline');
                Vditor.preview(previewElement, md,
                    {
                        hljs: { style: 'colorful' },
                        markdown:{
                            toc:true,

                        },
                        after () {
                            if (window.innerWidth <= 768) {
                                return
                            }
                            Vditor.outlineRender(previewElement, outlineElement)
                            if (outlineElement.innerText.trim() !== '') {
                                outlineElement.style.display = 'block'
                            }
                        },
                    }
                )
                this.loading=false;
            },
            // 初始化
            fetchArticle() {
                var tmp={};
                tmp['id']=this.$route.params.id;
                getArticleById(tmp).then(response => {
                    // const { data } = response.data;
                    // console.log(response.data[0])
                    const data=response.data[0];
                    console.log(data);
                    this.articleContent=data.articleContent;
                    // document.title = data.articleTitle;
                    this.articleTitle=data.articleTitle;
                    this.createTime=data.articleCreateTime;
                    this.updateTime=data.articleUpdateTime;
                    this.renderMarkdown(this.articleContent);
                    this.flag = true;
                })
            },
        }
    }
</script>

<style>
    #preview {
        min-height: 300px;
    }
</style>

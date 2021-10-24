<template>
    <div class="columns">
        <div class="column is-full">
            <el-card
                    class="box-card"
                    shadow="never"
            >
                <div
                        slot="header"
                        class="clearfix"
                >
                    <span><i class="fa fa fa-book"> 创建文章</i></span>
                </div>
                <div>
                    <el-form
                            ref="ruleForm"
                            :model="ruleForm"
                            :rules="rules"
                            class="demo-ruleForm"
                    >
                        <el-form-item prop="title">
                            <el-input
                                    v-model="ruleForm.title"
                                    placeholder="输入标题"
                            />
                        </el-form-item>

                        <!--Markdown-->
                        <div id="vditor" />


                        <el-form-item>
                            <el-button
                                    type="primary"
                                    @click="submitForm('ruleForm')"
                            >提交
                            </el-button>
                            <el-button @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    import {getArticleById,updateArticle} from "../../../api/article";
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    export default {
        name: 'article_create',

        data() {
            return {
                that:this,
                articleId:'',
                contentEditor: {},
                createTime:'',
                ruleForm: {
                    title: '', // 标题
                    content: '' // 内容
                },
                rules: {
                    title: [
                        { required: true, message: '请输入文章标题', trigger: 'blur' },
                        {
                            min: 1,
                            max: 25,
                            message: '长度在 1 到 25 个字符',
                            trigger: 'blur'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.articleId=this.$route.query.id;
            this.fetchArticle();
            this.contentEditor = new Vditor('vditor', {
                height: 500,
                theme: 'classic',
                counter: {
                    enable: true,
                    type: 'markdown'
                },
                preview: {
                    delay: 0,
                    hljs: {
                        style: 'monokai',
                        lineNumber: true
                    }
                },
                tab: '\t',
                typewriterMode: true,
                toolbarConfig: {
                    pin: true
                },
                cache: {
                    enable: false
                },
                mode: 'sv',
                after:()=>{
                    this.contentEditor.setValue(this.ruleForm.content)
                }
            });
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (
                            this.contentEditor.getValue().length === 1 ||
                            this.contentEditor.getValue() == null ||
                            this.contentEditor.getValue() === ''
                        ) {
                            alert('话题内容不可为空')
                            return false
                        }
                        this.ruleForm.content = this.contentEditor.getValue()
                        var tmp={};
                        tmp['articleId']=this.articleId;
                        tmp['articleTitle']=this.ruleForm.title;
                        tmp['articleContent']=this.ruleForm.content;
                        console.log(tmp);
                        updateArticle(tmp).then((response) => {
                            const { data } = response
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'admin_article_list',
                                })
                            }, 800)
                        })
                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields()
                this.contentEditor.setValue('')
                this.ruleForm.tags = ''
            },
            fetchArticle(){
                const tmp={};
                tmp['id']=this.articleId;
                getArticleById(tmp).then(response=>{
                    const data=response.data[0];
                    this.ruleForm.title=data.articleTitle;
                    this.ruleForm.content=data.articleContent;
                    this.createTime=data.articleCreateTime;
                })
            }
        }
    }
</script>

<style>

</style>
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
                            >立即创建
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
    import { createArticle } from "../../../api/article";
    import Vditor from 'vditor'
    import 'vditor/dist/index.css'

    export default {
        name: 'article_create',

        data() {
            return {
                contentEditor: {},
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
            this.contentEditor = new Vditor('vditor', {
                height: 500,
                placeholder: '此处为话题内容……',
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
                mode: 'sv'
            })
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
                        tmp['articleTitle']=this.ruleForm.title;
                        tmp['articleContent']=this.ruleForm.content;
                        createArticle(tmp).then((response) => {
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
            }
        }
    }
</script>

<style>
</style>

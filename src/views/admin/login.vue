<template>
    <div>
    <h1 style="text-align: center">管理员登陆</h1>
    <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="username">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="password">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登陆</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    import {submitAdmin} from "../../api/admin";

    export default {
        data() {
            return {
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods: {
            onSubmit() {
                submitAdmin(this.form).then(value=>{
                    localStorage.setItem("access-admin",JSON.stringify(value.data))
                    // this.$router.replace({path:'/admin'});
                    this.$router.push({
                        path:'/admin'
                    })
                })
            }
        }
    }
</script>

<style>

</style>
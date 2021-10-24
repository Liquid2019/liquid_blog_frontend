<template>
    <el-card shadow="hover">
        <img src="@/assets/1.jpg">
        <div style="text-align: center">
            <h1 style="font-weight: bold">Liquid</h1>
            <el-button type="primary" icon="el-icon-s-home
" @click="go">github</el-button>
        </div>

    </el-card>
</template>
<script>

    export default {
        name: "",
        data(){
            return{
            }
        },
        methods:{
            go(){
                window.location.href='https://github.com/Liquid2019'
                // window.location.href='https://www.baidu.com'
            }
        }
    }
</script>

<style>

</style>
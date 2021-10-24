<template>
<div>
    <h1 style="text-align: left">欢迎回来{{admin.username}}</h1>
    <el-col :span="12">
        <el-menu
                router
                :default-active="this.$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose">
            <el-menu-item index="/admin">
                <i class="el-icon-menu"></i>
                <span slot="title">文章</span>
            </el-menu-item>
            <el-menu-item index="/admin/friend">
                <i class="el-icon-menu"></i>
                <span slot="title">友链</span>
            </el-menu-item>
            <el-menu-item index="/admin/visitor">
                <i class="el-icon-menu"></i>
                <span slot="title">访客</span>
            </el-menu-item>
            <el-menu-item index="/admin/comment">
                <i class="el-icon-menu"></i>
                <span slot="title">留言</span>
            </el-menu-item>
        </el-menu>
    </el-col>
    <router-view></router-view>
</div>
</template>

<script>
    export default {
        name: "",
        data(){
            return{
                admin:{}
            }
        },
        created() {
            this.admin=JSON.parse(window.localStorage.getItem("access-admin"));
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>

</style>
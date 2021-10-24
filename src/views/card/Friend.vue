<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <span>友链</span>
        </div>
        <div>
            <p v-for="(item, index) in list" :key="index" class="block">
                <a :href="item.link" target="_blank">{{ item.title }}</a>
            </p>
        </div>
    </el-card>
</template>

<script>
    import {getAllFriend} from "../../api/friend_link";

    export default {
        name: 'Promotion',
        data() {
            return {
                list: []
            }
        },
        created() {
            this.fetchList()
        },
        methods: {
            fetchList() {
                getAllFriend().then((response) => {
                    const { data } = response
                    this.list = data
                })
            }
        }
    }
</script>

<style scoped>
</style>
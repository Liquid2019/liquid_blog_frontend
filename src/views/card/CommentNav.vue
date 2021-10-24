<template>
    <el-card class="box-card" shadow="hover">
        <div slot="header">
            <router-link to="/comment">留言板</router-link>
        </div>
        <div v-for="it in comment" class="text item">
            {{it.name}}:{{it.content}}
        </div>
    </el-card>
</template>

<script>
    import {getAllComment} from "../../api/comment";
    export default {
        name: "",
        data(){
            return{
                comment:[],
            }
        },
        created() {
            this.fetchComment();
        },
        methods:{
            fetchComment(){
                getAllComment().then(value => {
                    value.data.reverse();
                    this.comment = value.data.slice(0,3);
                    console.log(this.comment);
                })
            }
        }
    }
</script>

<style>

</style>
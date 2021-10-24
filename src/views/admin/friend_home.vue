<template>
    <div>
        <div>
            <li v-for="it in friend">
                {{it.title}}
                {{it.link}}
                <span @click="delete_friend(it.id)">删除</span>
            </li>
        </div>
        <div>--------------------------------</div>
        <h1>创建友链</h1>
        名称:<input v-model="title"></input>
        链接:<input v-model="link"></input>
        <button @click="submit_friend">提交</button>
    </div>
</template>

<script>
    import {deleteFriend,getAllFriend,createFriend} from "../../api/friend_link";
    export default {
        name: "Friend",
        data(){
            return{
                friend:{},
                title:'',
                link:'',
            }
        },
        created() {
            this.fetchFriend();
        }
        ,
        methods:{
            async fetchFriend(){
                getAllFriend().then((value)=>{
                    const data=value.data;
                    this.friend=data;
                })
            },
            async delete_friend(id){
                var tmp={};
                tmp['id']=id;
                deleteFriend(tmp).then((value)=>{
                    this.fetchFriend();
                })
            },
            async submit_friend(){
                var tmp={};
                tmp['title']=this.title;
                tmp['link']=this.link;
                createFriend(tmp).then((value)=>{
                    this.fetchFriend();
                })
            }
        }
    }
</script>

<style>
</style>
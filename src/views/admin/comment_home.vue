<template>
    <div>
        <table border="1">
            <tr>
                <th>name</th>
                <th>content</th>
                <th>time</th>
                <th>ip</th>
                <th>agent</th>
                <th>handle</th>
            </tr>
        <tr v-for="it in comment">
            <td width="150px">{{it.name}}</td>
            <td width="150px">{{it.content}}</td>
            <td width="150px">{{it.time}}</td>
            <td width="150px">{{it.host}}</td>
            <td width="500px">{{it.agent}}</td>
            <td @click="delete_comment(it.id)">删除</td>
        </tr>
        </table>

    </div>
</template>

<script>
    import {getAllComment,deleteComment} from "../../api/comment";

    export default {
        name: "comment_home",
        data(){
            return{
                comment:[]
            }
        },
        created() {
            this.fetchAllComment();
        },
        methods:{
            fetchAllComment(){
                getAllComment().then(value=>{
                    this.comment=value.data.reverse();
                    var one={};
                    for(one of this.comment){
                        var tmp=this.dayjs(one.time).format('YYYY-MM-DD HH:mm:ss');
                        one.time=tmp;
                    }
                })
            },
            delete_comment(id){
                const tmp={};
                tmp['id']=id;
                deleteComment(tmp).then(value => {
                    this.fetchAllComment();
                })
            }
        }
    }
</script>

<style>

</style>

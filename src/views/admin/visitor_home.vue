<template>
    <div>
        <div style="margin-top: 20px">
            <el-button @click="deleteVisitor">删除所有</el-button>
        </div>
        <el-table
                :data="visitor"
                style="width: 100%">
            <el-table-column
                    prop="host"
                    label="host"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="agent"
                    label="agent"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="time">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getAllVisitor,deleteAllVisitor} from "../../api/visitor";
    export default {
        name: "visitor",
        data(){
            return{
                visitor:[],
            }
        },
        created() {
            this.fetchVisitor();
        }
        ,
        methods:{
            async fetchVisitor(){
                getAllVisitor().then((value)=>{
                    this.visitor=value.data.reverse();
                    var one={};
                    for(one of this.visitor){
                        var tmp=this.dayjs(one.time).format('YYYY-MM-DD HH:mm:ss');
                        one.time=tmp;
                    }
                })
            },
            async deleteVisitor(){
                deleteAllVisitor();
                this.visitor=[];
                this.fetchVisitor();
            }
        }
    }
</script>

<style>

</style>
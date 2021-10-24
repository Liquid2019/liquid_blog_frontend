<template>
  <el-backtop :bottom="60" :right="60">
    <div title="回到顶部"
        style="{
        height: 100%;
        width: 100%;
        background-color: white;
        box-shadow: 0 1px 0 0;
        border-radius: 12px;
        text-align: center;
        line-height: 40px;
        color: #167df0;
      }"
    >
      <i class="el-icon-top"></i>
    </div>
  </el-backtop>
</template>

<script>
export default {
  name: "BackTop",
  data(){
    return{
      url:require('@/assets/1.jpg')
    }
  }
}
</script>

<style scoped>

</style>
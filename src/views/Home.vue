<template>
  <div>
    <el-card shadow="hover">{{billboard}}</el-card>
    <div class="columns">
      <div class="column is-three-quarters">
        <ArticleList></ArticleList>
      </div>
      <div class="column">
        <CardBar></CardBar>
      </div>
    </div>
  </div>
</template>

<script>
import CardBar from "@/views/card/CardBar";
import ArticleList from "@/views/post/Index";
export default {
  name: 'Home',
  components:{CardBar,ArticleList},
  data(){
    return{
      billboard:'文章列表'
    }
  }
}
</script>

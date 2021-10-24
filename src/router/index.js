import Vue from 'vue'
import VueRouter from 'vue-router'
import axios from "axios";
import Qs from "qs";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('@/views/Home')
  },
  {
    path: '/register',
    name: 'register',
    component: ()=>import('@/views/auth/Register'),
    meta:{title: 'register'}
  },
  {
    path: '/404',
    name: '404',
    component: ()=>import('@/views/error/404'),
    meta:{title:'404-NotFound '}
  },
  {
    path:'/post/:id',
    name:'post-detail',
    component:()=>import("@/views/post/Detail"),
  },
  {
    path:'/admin',
    name:'admin',
    component:()=>import("@/views/admin"),
    children:[
      {
        path: '',
        name: 'admin_home',
        component: () => import("@/views/admin/article_home"),
        children:[
          {
            path:'article_create',
            name:'admin_article_create',
            component:()=>import("@/views/admin/article/article_create"),
          },
          {
            path:'',
            name:'admin_article_list',
            component:()=>import("@/views/admin/article/article_list"),
          },
          {
            path:'article_edit',
            name:'admin_article_edit',
            component:()=>import("@/views/admin/article/article_edit"),
          }
        ],
      },
      {
        path:'friend',
        name:'admin_friend',
        component:()=>import("@/views/admin/friend_home")
      },
      {
        path:'visitor',
        name:'admin_visitor',
        component:()=>import("@/views/admin/visitor_home")
      },
      {
        path:'comment',
        name:'admin_comment',
        component:()=>import("@/views/admin/comment_home")
      },
      ]
  },
  {
    path:'/login',
    name:'login',
    component:()=>import("@/views/admin/login"),
  },
  {
    path:'/comment',
    name:'comment',
    component:()=>import("@/views/post/CommentPage")
  },
  {
    path:'*',
    redirect:'/404',
    hidden:true
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  document.title = "Liquid's blog"
  next()
  let admin=JSON.parse(window.localStorage.getItem("access-admin"))
  if(to.name.indexOf('admin')!=-1){
    if(!admin){
      next({
        path: '/login'
      })
    }
    else{
      const tmp={};
      tmp['token']=admin.token;
      axios({
        url:'http://127.0.0.1:2001/admin/checkToken',
        method:'post',
        transformRequest: [function (data) {
          // 对 data 进行任意转换处理
          return Qs.stringify(data)
        }],
        data:tmp
      }).then(res=>{
        if(res.data.data==true){
          next();
        }
        else{
          next({
            path: '/login'
          })
        }
      })
    }
  }
  // if(!admin&&to.name.indexOf('admin')!=-1){
  //       next({
  //         path: '/login'
  //       })
  // }
  else{
    next();
  }
})

export default router

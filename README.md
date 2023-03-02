# 项目说明

- 此项目为数据库查询系统



- 项目运行
  - npm install 
  - 
  - npm run serve
  - 

  


- 后端API接口查看访问路径为 ： http://localhost:8093/doc.html
- 暂时不设置页面白名单，所有操作需要登入获取token后才可进行操作
  - 初始登入管理账号密码为  ====》  admin  admin
  - 首页路径为 “/”   后端管理为“/admin”

  

- 项目目录（plant-gene-client）：

  - --public  静态文件目录

  - --src

  - ```
    ├── api -- axios网络请求定义
    ├── assets -- 静态图片资源文件
    ├── components -- 通用组件封装
    ├── composables -- 通用js函数封装
    ├── layout -- 通用页面加载框架
    ├── router -- vue-router路由配置
    ├── store -- vuex的状态管理
    └── pages -- 前端页面
        ├── Home -- 首页
        ├── login -- 登录页
        ├── chart -- 图表组件模块
    └──axios  -- 配置文件，设置请求和响应拦截器
    └──menu.js  后台管理页菜单项
    └── premission 全局守卫配置 
    ```

- 项目技术选型：

- ```
  - VUE3 前端框架
  - Vue-router 路由框架
  - Vuex  全局状态管理框架
  - Element-Plus 前端UI框架
  - tailwind 前端CSS框架
  - Axios 前端HTTP 框架
  - E-charts 图表框架
  - nprogress 进度条组件
  
  ```

  

  

  


# 项目说明

- 此项目为数据库查询系统



- 项目运行
  - npm install 
  - 
  - npm run dev
  - 

  


- 后端API接口查看访问路径为 ： http://175.178.9.163:8093/doc.html
                        http://175.178.9.163:8093/swagger-ui.html#/
- Postman 的API导入路径为 ：http://175.178.9.163:8093/v2/api-docs
- 暂时不设置页面白名单，所有操作需要登入获取token后才可进行操作
  - 初始登入管理账号密码为  ====》  admin  admin
  - 首页路径为 “/”   后端管理为“/admin” 登录路径为“/login”

  

- 项目目录（plant-gene-client）：

  - --public  静态文件目录

  - --src

  - ```
    ├── api -- axios网络请求定义
    ├── assets -- 静态图片资源文件
    ├── components -- 通用组件封装
    ├── composables -- 通用js函数封装
    ├── layout -- 通用页面加载框架(不需要，回头删了)
    ├── router -- vue-router路由配置
        ├── index.js -- router基础配置
        ├── permission.js -- 路由守卫
    ├── store -- pinia
        ├── browse.js -- browse仓库
        ├── userInfo.js -- 用户信息仓库
    ├── style -- 全局样式
    └── views -- 前端页面
        ├── home -- 首页
        ├── browse -- 浏览
        ├── download -- 下载
        ├── helps --帮助
        ├── Login.vue -- 登录
        ├── Layout.vue -- 通用布局
        ├── Error.vue -- 错误页
    ```

- 项目技术选型：

- ```
  - VUE3 前端框架
  - Vue-router 路由框架
  - Pinia  全局状态管理框架
  - Element-Plus 前端UI框架
  - tailwind 前端CSS框架
  - Axios 前端HTTP 框架
  - E-charts 图表框架
  - nprogress 进度条组件
  
  ```

  

  

  


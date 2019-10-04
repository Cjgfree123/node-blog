## node-blog

node 搭建个人博客

## 步骤

1. 创建项目

2. 创建服务，监听端口

3. 设置路由

## 路由描述

#### 用户

注册: /user/signup

/**
    注册功能如何实现

    1. 绘制注册页面模板(username password email)
    2. 实现提交用户注册路由(post /user/signup)
    3. 在路由中获得请求体, 然后把此信息保存到数据库中。
    4. 保存完毕后，跳转到登录页。
    
*/

#### 遇到问题

1. bootstrap图标没有展示

2. mongoose.model

```
let mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017").then(() => {
    console.log('MongoDB is connected');
}).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
});

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
});
// 定义用户模型,
let User = mongoose.model("User", UserSchema);
// 将用户模型挂载到导出对象上
exports.User = User;

```

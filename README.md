## node-blog

node 搭建个人博客

## 步骤

1. 创建项目

2. 创建服务，监听端口

3. 设置路由

4. session

5. 权限路由(保护需要登陆后, 才能访问的路径)
    * 登录状态判断中间件

6. 成功和失败时的消息提示(先声明并使用flash, 再全局定义成功失败模板, 最后路由中间件全局挂载res.locals)

    1. connect-flash 消息提示中间件

    使用说明:

    ```
    let flash = require("connect-flash");

    app.use(flash());
    ```

    2. 注意: 该中间件依赖于session,必须先 app.use(session),再 app.use(flash);

    3. 赋值 req.flash(type, msg)
       取值 req.flash(type)

       type: error/success

    4. 如果连写多个, 存放取出都是数组

    ```
    req.flash("success","用户登录成功1");
    req.flash("success","用户登录成功2");
    ```

    5. 功能: 读完一次之后, 会立即清空数据。(一开始展示,刷新后清空对应数据)

## 路由描述

## session 

(1) 存储回话
(2) 根据登录态, 控制页面是否展示
(3) 通过session,在每次用户登录时, 访问的都是 同一块内存
(4) 退出登录时, 要清除掉session,并重定向到 登录页。

登录前: 首页 注册  登录

登陆后: 退出 发表文章

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

3. 会话中间件(例如express-session)等中间件，必须在app.use("路径")装载路由前进行使用, 否则路由将无法使用上中间件。

```
// 在使用了此会话中间件之后，会在请求对象上,增加req.session属性。
app.use(session({
    resave: false, // 每次客户端请求到服务器，都会保存session
    secret: "zfpx", // 用来加密cookie
    saveUninitialized: true, // 保存未初始化的session(即不管客户端是否使用, 服务端都将返回session)。
}));

app.use(function(req, res, next){
    console.log("公共变量", req.session.user);
    // 真正渲染模板的是 res.locals
    res.locals.user = req.session.user;
    next();
})
```

4. ejs模板报错, esc is not function.(通常是模板错误，建议删除二分调试法)

5. 在首页路由里, 定义了user变量。 但是: 因为每个页面都用到了导航条，总不能每个路由都定义user 的session变量。
 所以, 寻找一种 一次定义user变量, 全局路由可以使用的方法。 
 解决: 
    * 路由中间件。
    * 取到session变量 req.session.user
    * 模板的数据对象 res.local.user

6. 模板渲染数据

    * 全局通用 res.local.user(user说明:模板中使用的变量名)
    * 局部 res.render("模板名", data); // 优先级更高

7. 如何判断权限路由?

   使用路由中间件

    * 如何使用? 

    ```
    // checkNotLogin: 路由校验函数
    router.get("/signin", checkNotLogin, function(req, res){
        // ................
    });

    exports.checkNotLogin = function(req,res, next){
        if(req.session.user){
            // 已登录, 跳回首页
            res.redirect("/");
        }else{
            // 未登录, 继续访问
            next();
        };
    };

    ```

7. 报错req.flash没有定义

解决: 先挂载，再使用.

```
app.use(flash());

app.use(function(req, res, next){
    // ...
    res.locals.success = req.flash("success").toString();
    res.locals.error = req.flash("error").toString();
    next();
});
```

注意: 因为 req.flash原理类似于请求会话session,即: res.flash("error","用户注册失败");会报错。  解决: req.flash("error","用户注册失败");

8. 请求文件类型说明

* 上传文件、图片时, 需要定义: enctype="multipart/form-data"。
    1. 处理文件/图片的中间件: multer.(备注: multer 仅仅用来处理文件类型: multipart/form-data)
    2. multer 将会把图片资源(input file)挂载在req.file上, 将文本(input text)挂载在req.body上。

* 普通: enctype="application/x-www-form-urlencoded"。

9. 上传图片步骤

    1. 上传表单(需要定义表单文件类型enctype)
    2. 安装引入multer, 自定义图片上传路径
        * ps: 当表单里, 只有一个上传字段的话, 这个字段名将是上传文件字段的name属性
    3. 将上传后的图片地址, 存到数据库对应字段中
    4. 模板可以直接展示(注意: user有值再展示)

10. 路由中间件, 可以添加多个。
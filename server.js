let express = require("express");
let path = require("path");
let bodyParser = require("body-parser");
// 会话中间件
let session = require("express-session");
// 消息提示中间件(一闪而过)
let flash = require("connect-flash");
let multer = require("multer");
let MongoStore = require('connect-mongostore')(session);
let app = express();

// 模板文件夹下的后缀，必须以html结尾
app.set("view engine","html");
// 指定模板的存放根目录
app.set("views", path.resolve("views"));
// 指定对于html类型的模板, 使用ejs来进行渲染。
app.engine("html", require("ejs").__express);
app.use(bodyParser.urlencoded({
    extended: true,
})); // 解析客户端提交过来的请求体, 并转成对象，赋值给req.body

// 拦截请求，返回对应目录的静态文件。如果能找到，则返回客户端并结束请求。
app.use(express.static(path.resolve("public")));

// 在使用了此会话中间件之后，会在请求对象上,增加req.session属性。
app.use(session({
    resave: false, // 每次客户端请求到服务器，都会保存session
    secret: "zfpx", // 用来加密cookie
    saveUninitialized: true, // 保存未初始化的session(即不管客户端是否使用, 服务端都将返回session)。
    cookie: {
        maxAge: 3600 * 1000, // 指定cookie过期时间1小时(单位: 毫秒)
    },
    store: new MongoStore({
        url:'mongodb://localhost/myapp',
    }) // 数据持久化
}));

// 切记! 此中间件的使用，主要放在session的后面, 因为此中间件是需要依赖session的。
app.use(flash());

app.use(function(req, res, next){
    console.log("公共变量", req.session.user);
    // 真正渲染模板的是 res.locals
    res.locals.user = req.session.user;
    res.locals.keyword = "";
    // 定义消息
    res.locals.success = req.flash("success").toString();
    res.locals.error = req.flash("error").toString();
    next();
});

let index = require("./routes/index");
app.use("/", index);

let user = require("./routes/user");
// 用来匹配 /user/
app.use("/user", user);

let article = require("./routes/article");
// 用来匹配 /article/
app.use("/article", article);

app.listen(8080,()=>{
    console.log("port at 8080");
});


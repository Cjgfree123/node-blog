let express = require("express");
let path = require("path");
let app = express();

// 模板文件夹下的后缀，必须以html结尾
app.set("view engine","html");
// 指定模板的存放根目录
app.set("views", path.resolve("views"));
// 指定对于html类型的模板, 使用ejs来进行渲染。
app.engine("html", require("ejs").__express);

// 拦截请求，返回对应目录的静态文件。如果能找到，则返回客户端并结束请求。
app.use(express.static(path.resolve("public")));

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
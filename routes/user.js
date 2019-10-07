let express = require("express");

let multer = require("multer");
let uploads = multer({
    dest: "public/uploads", // 自定义上传服务器的路径 localhost:8080/uploads/b5fb0837dacc2576a02d7b8aeee9e0ae
});

let { User } = require("../model/index.js");
let { checkLogin, checkNotLogin } = require("../auth.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /user/signup  [get] 
router.get("/signup", checkNotLogin, function (req, res) {
    res.render("user/signup", {
        title: "注册",
    })
});

// /user/signup  [post]
// 当表单里, 只有一个上传字段的话, 这个字段名(avatar)将是上传文件字段的name属性
router.post("/signup", checkNotLogin, uploads.single("avatar"), async function (req, res) {
    console.log("img", req.file);
    console.log("text", req.body);
    let body = req.body; // 请求体对象(username,password, email)
    // 因为已经将: public作为静态文件根目录,所以这里从public下开始
    body.avatar = `/uploads/${req.file.filename}`; // 数据库要有avatar字段
    let user = new User(body);
    let result = await user.save();
    if (result) {
        // 注册成功
        res.redirect("/user/signin");
        req.flash("success","用户注册成功");
    } else {
        // 注册失败
        res.redirect("back");
        req.flash("error","用户注册失败");
    };
});

// /user/signin  [get]
router.get("/signin", checkNotLogin, function (req, res) {
    res.render("user/signin", {
        title: "登录",
    })
});

// /user/signin  [post]
router.post("/signin", function (req, res) {
    // 得到用户提交的登录表单
    let user = req.body;
    User.findOne(user, function (err, doc) {
        if (err) {
            req.flash("error", "操作数据库失败");
            res.redirect("back");
        } else {
            // 登陆成功了,有对应用户
            if (doc) {
                // 向会话对象中写入属性 user=doc
                req.session.user = doc;
                req.flash("success","用户登录成功");
                res.redirect("/");
            } else {
                // 没有找到对应用户
                res.redirect("back");
                req.flash("error", "用户名或密码不正确");
            };
        };
    });
});

// /user/signup  [get]
router.get("/signout", checkLogin, function (req, res) {
    req.session.user = null;
    req.flash("success","用户成功退出登录");
    res.redirect("/user/signin");
    res.render("user/signout", {
        title: "退出",
    });
});

module.exports = router;
let express = require("express");
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
router.post("/signup", checkNotLogin, async function (req, res) {
    let body = req.body; // 请求体对象(username,password, email)
    let user = new User(body);
    let result = await user.save();
    if (result) {
        // 注册成功
        res.redirect("/user/signin");
        res.flash("success","用户注册成功");
    } else {
        // 注册失败
        res.redirect("back");
        res.flash("error","用户注册失败");
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
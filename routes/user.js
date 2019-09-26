let express = require("express");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /user/signup  [get]
router.get("/signup", function(req, res){
    res.render("user/signup", {
        title:"注册",
    })
});

// /user/signin  [get]
router.get("/signin", function(req, res){
    res.render("user/signin", {
        title:"登录",
    })
});
// /user/signup  [get]
router.get("/signout", function(req, res){
    res.render("user/signout", {
        title:"退出",
    })
});

module.exports = router;
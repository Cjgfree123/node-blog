let express = require("express");
let { User } = require("../model");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /user/signup  [get]
router.get("/signup", function(req, res){
    res.render("user/signup", {
        title:"注册",
    })
});

// /user/signup  [post]
router.post("/signup", function(req, res){
   console.log("......提交注册", req);
   let user = req.body; // 请求体对象(username,password, email)
   User.create(user, function(err, doc){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/user/signin");
        }
    });
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
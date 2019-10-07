let express = require("express");
let { User } = require("../model/index.js");
// console.log("uuu", User)

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /user/signup  [get]
router.get("/signup", function(req, res){
    res.render("user/signup", {
        title:"注册",
    })
});

// /user/signup  [post]
router.post("/signup",async function(req, res){
   let body = req.body; // 请求体对象(username,password, email)
   let user = new User(body);
   await user.save();
   res.redirect("/user/signin");
});

// /user/signin  [get]
router.get("/signin", function(req, res){
    res.render("user/signin", {
        title:"登录",
    })
});

// /user/signin  [post]
router.post("/signin", function(req, res){
    let user = req.body;
    User.findOne(user, function(err, doc){
        if(err){
            res.redirect("back");
        }else{
            // 登陆成功了,有对应用户
            if(doc){
                res.redirect("/");
            }else{
                // 没有找到对应用户
                res.redirect("back");
            };
        };
    });
});

// /user/signup  [get]
router.get("/signout", function(req, res){
    res.render("user/signout", {
        title:"退出",
    })
});

module.exports = router;
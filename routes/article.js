let express = require("express");
let { checkLogin } = require("../auth.js");
let { Article } = require("../model/index.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// /article/add  [get]
// 路由路径，前面有/
router.get("/add", checkLogin, function (req, res) {
    // 因为模板路径配置过，所以前面没有/
    res.render("article/add", { title: "发表文章" })
});

// /article/add  [post]
// 路由路径，前面有/
router.post("/add", checkLogin, async function (req, res) {
    let body = req.body;
    // req.session.user: 获取到的是个列表
    body.user = req.session.user && req.session.user.length ? req.session.user[0] && req.session.user[0] : {}; // 作者是当前的登录用户
    let article = new Article(body);
    try {
        await article.save();
        req.flash('success', '文章发表成功');
        res.redirect("/");
    } catch (err) {
        req.flash('error', err);
        res.redirect("back");
    }
});

// /article/:_id [get] 文章那个详情
router.get("/detail/:_id", function(req, res){
    // 获取路径参数_id
    let _id = req.params._id;
    Article.findById(_id, function(err,article){
        if(err){
            req.flash("error",err);
            res.redirect("back");
        }else{
            res.render("article/detail", {
                title: "文章详情",
                article,
            });
        }
    });
});

// 删除某篇文章
router.get("/delete/:_id", function(req, res){
    let _id = req.params._id;
    console.log("删除id", _id)
    Article.remove({_id}, function(err, result){
        if(err){
            req.flash("error", err);
            res.redirect("back");
        }else{
            req.flash("success","删除文章成功");
            res.redirect("/");
        };
    },);
})

module.exports = router;
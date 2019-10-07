let express = require("express");
let { Article } = require("../model/index.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// / [get] 首页
router.get("/", function (req, res) {
    Article.find().populate("user").exec(function (err, articles) {
        // 路由是相对路径，相对于模板根目录
        res.render("index", {
            title: "首页",
            articles,
        });
    });
});

module.exports = router;
let express = require("express");
let { Article } = require("../model/index.js");

// 调用Router方法，可以得到一个路由中间件实例
let router = express.Router();

// / [get] 首页
router.get("/", function (req, res) {
    let {
        keyword
    } = req.query;
    let query = {};
    if (keyword) {
        // 标题、内容匹配关键字
        // query.title = new RegExp(keyword);
        // 正则或
        query['$or'] = [
            {
                title: new RegExp(keyword)
            }, 
            {
                content: new RegExp(keyword)
            }];
    };

    Article.find(query).populate("user").exec(function (err, articles) {
        // 路由是相对路径，相对于模板根目录
        res.render("index", {
            title: "首页",
            articles,
            keyword,
        });
    });
});

module.exports = router;